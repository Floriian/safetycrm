import { Injectable } from '@nestjs/common';
import { CreateRuleDto } from './dto/create-rule.dto';
import { UpdateRuleDto } from './dto/update-rule.dto';
import { RuleRepository } from './repositories/rule.repository';
import { ParentRuleNotFoundException } from './exceptions/parent-rule-not-found.exception';
import {
  FindOptionsOrder,
  FindOptionsWhere,
  ILike,
  QueryFailedError,
} from 'typeorm';
import { RuleAlreadyExistsException } from './exceptions/rule-already-exists.exception';
import { RuleQueryDto } from './dto/rule-query.dto';
import { Rule } from './entities/rule.entity';
import { ClientRepository } from 'src/clients/repositories/client.repository';
import { RuleClientDto } from './dto/RuleClientDto';
import { ClientNotFoundException } from 'src/clients/exceptions/client-not-found.exception';
import { RuleNotFoundException } from './exceptions/rule-not-fond.exception';

@Injectable()
export class RulesService {
  constructor(
    private readonly ruleRepository: RuleRepository,
    private readonly clientRepository: ClientRepository,
  ) {}
  async create(createRuleDto: CreateRuleDto) {
    try {
      const rule = this.ruleRepository.create(createRuleDto);

      if (createRuleDto.parentId) {
        const parentRule = await this.ruleRepository.findOneById(
          createRuleDto.parentId,
        );
        if (!parentRule) throw new ParentRuleNotFoundException();
        rule.parent = parentRule;
      }

      return await this.ruleRepository.save(rule);
    } catch (e) {
      if (e instanceof QueryFailedError) {
        if (e.message.includes('duplicate key violates'))
          throw new RuleAlreadyExistsException();
      }
      throw e;
    }
  }

  async assignRule(dto: RuleClientDto) {
    const client = await this.clientRepository.findOneById(dto.clientId);
    if (!client) throw new ClientNotFoundException();

    const rule = await this.ruleRepository.findOneById(dto.ruleId);
    if (!rule) throw new RuleNotFoundException();

    try {
      rule.clients = [...rule.clients, client];
      return await this.ruleRepository.save(rule);
    } catch (e) {
      console.log(e);
      throw e;
    }
  }

  async deassignRule(dto: RuleClientDto) {
    const client = await this.clientRepository.findOneById(dto.clientId);
    if (!client) throw new ClientNotFoundException();

    const rule = await this.ruleRepository.findOneById(dto.ruleId);
    if (!rule) throw new RuleNotFoundException();

    try {
      const newRules = rule.clients.filter(
        (client) => client.id !== dto.clientId,
      );

      rule.clients = newRules;

      return await this.ruleRepository.save(rule);
    } catch (e) {
      console.log(e);
      throw e;
    }
  }

  async findAll() {
    return (await this.ruleRepository.findTrees()).sort((current, next) => {
      if (current.children.length < next.children.length) return 1;
      if (current.children.length > next.children.length) return -1;
      return 0;
    });
  }

  async all(dto: RuleQueryDto) {
    const whereAttributes = this.buildWhereAttributesFromDto(dto);
    const orderAttributes = this.buildOrderValuesFromDto(dto);
    return await this.ruleRepository.find({
      where: whereAttributes,
      order: orderAttributes,
    });
  }

  async getNotAppliedClientRules(clientId: number) {
    const rules = await this.ruleRepository
      .createQueryBuilder('rule')
      .leftJoin('rule.clients', 'client', 'client.id = :clientId', { clientId })
      .where('client.id IS NULL')
      .getMany();

    return await this.toPromises(rules);
  }

  async getAppliedClientRules(clientId: number) {
    const rules = await this.ruleRepository
      .createQueryBuilder('rule')
      .leftJoin('rule.clients', 'client')
      .where('client.id = :clientId', { clientId })
      .getMany();

    return await this.toPromises(rules);
  }

  async findOne(id: number) {
    return await this.ruleRepository.findOneById(id);
  }

  async update(id: number, updateRuleDto: UpdateRuleDto) {
    try {
      const currentRule = await this.ruleRepository.findOneById(id);

      //If rule doesnt has parent rule, but the DTO has parentID, assign the parent rule to currentRule.
      if (!currentRule.parent && updateRuleDto.parentId) {
        const parentRule = await this.ruleRepository.findOneById(
          updateRuleDto.parentId,
        );
        if (!parentRule) throw new ParentRuleNotFoundException();

        currentRule.parent = parentRule;
      }

      //If rule has parentRule, but DTO doesn't has parentID, remove children from the parent
      if (currentRule.parent && !updateRuleDto.parentId) {
        const parentRule =
          await this.ruleRepository.findDescendantsTree(currentRule);

        if (!parentRule) throw new ParentRuleNotFoundException();
        parentRule.parent = null;
        await this.ruleRepository.save(parentRule);
      }

      //If rule has parent rule, but dto is changed, change currentrule parent.
      if (
        updateRuleDto.parentId &&
        currentRule.parent.id !== updateRuleDto.parentId &&
        currentRule.parent
      ) {
        const parentRule = await this.ruleRepository.findOneById(
          updateRuleDto.parentId,
        );
        if (!parentRule) throw new ParentRuleNotFoundException();

        currentRule.parent = parentRule;
      }

      Object.assign(currentRule, updateRuleDto);

      return await this.ruleRepository.save(currentRule);
    } catch (e) {
      if (e instanceof QueryFailedError) {
        if (e.message.includes('duplicate key violates'))
          throw new RuleAlreadyExistsException();
      }
      throw e;
    }
  }

  async remove(id: number) {
    await this.findOne(id);
    return await this.ruleRepository.delete(id);
  }

  private buildOrderValuesFromDto(dto: RuleQueryDto): FindOptionsOrder<Rule> {
    const orderOptions: FindOptionsOrder<Rule> = {};

    const orderByFields = dto.orderByFields as unknown as string | undefined;
    if (typeof orderByFields === 'string') {
      orderByFields
        .split(',')
        .filter((field): field is keyof Rule => field !== '')
        .forEach((field) => {
          orderOptions[field] = 'ASC';
        });
    }

    return orderOptions;
  }

  private buildWhereAttributesFromDto(
    dto: RuleQueryDto,
  ): FindOptionsWhere<Rule> | FindOptionsWhere<Rule>[] {
    const options: FindOptionsWhere<Rule> | FindOptionsWhere<Rule>[] = [];
    for (const [key, value] of Object.entries(dto)) {
      if (key !== 'orderByFields') {
        options.push({ [key]: ILike(`%${value}%`) });
      }
    }

    return options;
  }

  private async toPromises(rules: Rule[]) {
    const rulesPromises = rules.map((rule) =>
      this.ruleRepository.findDescendantsTree(rule),
    );
    return await Promise.all(rulesPromises);
  }
}

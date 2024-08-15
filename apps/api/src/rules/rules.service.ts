import { Injectable } from '@nestjs/common';
import { CreateRuleDto } from './dto/create-rule.dto';
import { UpdateRuleDto } from './dto/update-rule.dto';
import { RuleRepository } from './repositories/rule.repository';
import { ParentRuleNotFoundException } from './exceptions/parent-rule-not-found.exception';
import { QueryFailedError } from 'typeorm';
import { RuleAlreadyExistsException } from './exceptions/rule-already-exists.exception';
import { RuleQueryDto } from './dto/rule-query.dto';

@Injectable()
export class RulesService {
  constructor(private readonly ruleRepository: RuleRepository) {}
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

  async findAll() {
    return await this.ruleRepository.findTrees();
  }

  async all(dto: RuleQueryDto) {
    return await this.ruleRepository.find({
      where: {
        ...(dto.name && { name: dto.name }),
      },
    });
  }

  async findOne(id: number) {
    return await this.ruleRepository.findOneById(id);
  }

  async update(id: number, updateRuleDto: UpdateRuleDto) {
    try {
      const currentRule = await this.ruleRepository.findOneById(id);

      //If rule doesnt have parent rule, but the DTO has parentID, assign the parent rule to currentRule.
      if (!currentRule.parent && updateRuleDto.parentId) {
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
}

import { Injectable } from '@nestjs/common';
import { CreateRuleDto } from './dto/create-rule.dto';
import { UpdateRuleDto } from './dto/update-rule.dto';
import { RuleRepository } from './repositories/rule.repository';
import { ParentRuleNotFoundException } from './exceptions/parent-rule-not-found.exception';
import { IsNull } from 'typeorm';
import { Rule } from './entities/rule.entity';

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
      console.error(e);
    }
  }

  async findAll() {
    return await this.ruleRepository.findTrees();
  }

  async all() {
    return await this.ruleRepository.find();
  }

  async findOne(id: number) {
    return await this.ruleRepository.findOneById(id);
  }

  update(id: number, updateRuleDto: UpdateRuleDto) {
    return `This action updates a #${id} rule`;
  }

  remove(id: number) {
    return `This action removes a #${id} rule`;
  }
}

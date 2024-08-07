import { Repository } from 'typeorm';
import { Rule } from '../entities/rule.entity';
import { InjectRepository } from '@nestjs/typeorm';

export class RuleRepository extends Repository<Rule> {
  constructor(
    @InjectRepository(Rule) private readonly ruleRepository: Repository<Rule>,
  ) {
    super(
      ruleRepository.target,
      ruleRepository.manager,
      ruleRepository.queryRunner,
    );
  }
}

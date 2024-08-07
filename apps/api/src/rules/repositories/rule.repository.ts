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

  async findOneById(id: number) {
    return await this.ruleRepository.findOne({
      where: {
        id,
      },
      relations: {
        children: true,
        parent: true,
      },
    });
  }

  async findOneByParentId(parentId: number) {
    return await this.ruleRepository.find({
      where: {
        parent: {
          id: parentId,
        },
      },
      relations: {
        children: true,
        parent: true,
      },
    });
  }
}

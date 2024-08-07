import { Module } from '@nestjs/common';
import { RulesService } from './rules.service';
import { RulesController } from './rules.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Rule } from './entities/rule.entity';
import { RuleRepository } from './repositories/rule.repository';

@Module({
  controllers: [RulesController],
  providers: [RulesService, RuleRepository],
  imports: [TypeOrmModule.forFeature([Rule])],
})
export class RulesModule {}

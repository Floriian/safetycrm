import { Module } from '@nestjs/common';
import { RulesService } from './rules.service';
import { RulesController } from './rules.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Rule } from './entities/rule.entity';
import { RuleRepository } from './repositories/rule.repository';
import { ClientRepository } from 'src/clients/repositories/client.repository';
import { Client } from 'src/clients/entities/client.entity';

@Module({
  controllers: [RulesController],
  providers: [RulesService, RuleRepository, ClientRepository],
  imports: [TypeOrmModule.forFeature([Rule, Client])],
})
export class RulesModule {}

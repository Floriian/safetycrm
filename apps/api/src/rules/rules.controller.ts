import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Request,
} from '@nestjs/common';
import { RulesService } from './rules.service';
import { CreateRuleDto } from './dto/create-rule.dto';
import { UpdateRuleDto } from './dto/update-rule.dto';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Rule } from './entities/rule.entity';
import { RuleQueryDto } from './dto/rule-query.dto';
import { Request as ExpressRequest } from 'express';

@Controller('rules')
@ApiTags(RulesController.name)
export class RulesController {
  constructor(private readonly rulesService: RulesService) {}

  @Post()
  @ApiCreatedResponse({
    type: Rule,
  })
  create(@Body() createRuleDto: CreateRuleDto) {
    return this.rulesService.create(createRuleDto);
  }

  @Get()
  @ApiOkResponse({
    type: [Rule],
  })
  findAll() {
    return this.rulesService.findAll();
  }

  //Why @Query doesnt parse the url query???
  @Get('all')
  @ApiOkResponse({
    type: [Rule],
  })
  allRules(@Request() req: ExpressRequest) {
    return this.rulesService.all(req.query as unknown as RuleQueryDto);
  }

  @Get(':id')
  @ApiOkResponse({
    type: Rule,
  })
  findOne(@Param('id') id: string) {
    return this.rulesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRuleDto: UpdateRuleDto) {
    return this.rulesService.update(+id, updateRuleDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.rulesService.remove(+id);
  }
}

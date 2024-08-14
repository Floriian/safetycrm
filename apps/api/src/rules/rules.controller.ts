import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { RulesService } from './rules.service';
import { CreateRuleDto } from './dto/create-rule.dto';
import { UpdateRuleDto } from './dto/update-rule.dto';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { Rule } from './entities/rule.entity';
import { RuleQueryDto } from './dto/rule-query.dto';

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
  findAll() {
    return this.rulesService.findAll();
  }

  @Get('all')
  allRules(@Query() dto: RuleQueryDto) {
    return this.rulesService.all(dto);
  }

  @Get(':id')
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

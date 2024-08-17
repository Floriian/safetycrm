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
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
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
  @ApiOkResponse({
    type: [Rule],
  })
  findAll() {
    return this.rulesService.findAll();
  }

  @Get('all')
  @ApiQuery({ type: RuleQueryDto })
  @ApiOkResponse({
    type: [Rule],
  })
  allRules(@Query() query: RuleQueryDto) {
    return this.rulesService.all(query);
  }

  @Get(`client/not-applied/:id`)
  getNotAppliedClientRules(@Param('id') id: string) {
    return this.rulesService.getNotAppliedClientRules(+id);
  }

  @Get('client/:id')
  getAppliedClientRules(@Param('id') id: string) {
    return this.rulesService.getAppliedClientRules(+id);
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

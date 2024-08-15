import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsOptional } from 'class-validator';

export class RuleQueryDto {
  @ApiPropertyOptional()
  @IsOptional()
  @Transform(({ value }) => value.toString().toLowerCase())
  name?: string;

  @ApiPropertyOptional()
  @IsOptional()
  orderByFields?: Array<keyof RuleQueryDto>;
}

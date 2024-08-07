import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateRuleDto {
  @ApiProperty({ description: 'Rule name' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ description: 'Rule parent id. Optional.' })
  @IsNumber()
  @IsOptional()
  parentId?: number;

  @ApiProperty({ description: 'Rule descriptipn. Optional.' })
  @IsString()
  @IsOptional()
  description?: string;
}

import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateRuleDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @IsOptional()
  parentId?: number;

  @IsString()
  @IsOptional()
  description?: string;
}

import { IsNotEmpty, IsNumber } from 'class-validator';

export class RuleClientDto {
  @IsNotEmpty()
  @IsNumber()
  clientId: number;

  @IsNotEmpty()
  @IsNumber()
  ruleId: number;
}

import { IsArray, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { CreateContactDto } from 'src/contacts/dto/create-contact.dto';

export class CreateClientDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsArray()
  @IsOptional()
  contacts: CreateContactDto[];
}

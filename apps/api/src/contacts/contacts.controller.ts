import { Controller, Delete, Param } from '@nestjs/common';
import { ContactsService } from './contacts.service';

@Controller('contacts')
export class ContactsController {
  constructor(private readonly contactsService: ContactsService) {}

  @Delete(':id')
  deleteMany(@Param('id') id: string) {
    return this.contactsService.deleteMany(+id);
  }
}

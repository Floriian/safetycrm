import { Module } from '@nestjs/common';
import { ContactsService } from './contacts.service';
import { ContactsController } from './contacts.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Contact } from './entity/contact.entity';
import { ContactRepository } from './repositories/contact.repository';

@Module({
  controllers: [ContactsController],
  providers: [ContactsService, ContactRepository],
  imports: [TypeOrmModule.forFeature([Contact])],
})
export class ContactsModule {}

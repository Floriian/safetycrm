import { Module } from '@nestjs/common';
import { ClientsService } from './clients.service';
import { ClientsController } from './clients.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Client } from './entities/client.entity';
import { ClientRepository } from './repositories/client.repository';
import { ContactRepository } from 'src/contacts/repositories/contact.repository';
import { Contact } from 'src/contacts/entity/contact.entity';

@Module({
  controllers: [ClientsController],
  providers: [ClientsService, ClientRepository, ContactRepository],
  imports: [TypeOrmModule.forFeature([Client, Contact])],
})
export class ClientsModule {}

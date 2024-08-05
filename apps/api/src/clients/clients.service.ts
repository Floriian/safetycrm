import { Injectable } from '@nestjs/common';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { ClientRepository } from './repositories/client.repository';
import { ClientNotFoundException } from './exceptions/client-not-found.exception';
import { QueryFailedError } from 'typeorm';
import { ContactRepository } from 'src/contacts/repositories/contact.repository';

@Injectable()
export class ClientsService {
  constructor(
    private readonly clientRepository: ClientRepository,
    private readonly contactRepository: ContactRepository,
  ) {}
  async create(createClientDto: CreateClientDto) {
    try {
      const newClient = await this.clientRepository.store(createClientDto);

      const contactInstances = createClientDto.contacts.map((client) =>
        this.contactRepository.create({
          ...client,
          client: { id: newClient.id },
        }),
      );

      await this.contactRepository.save(contactInstances);

      return newClient;
    } catch (e) {
      console.error(e);
    }
  }

  async findAll() {
    return await this.clientRepository.find();
  }

  async findOne(id: number) {
    try {
      const client = await this.clientRepository.findOneById(id);
      if (!client) throw new ClientNotFoundException();
      return client;
    } catch (e) {
      if (
        e instanceof QueryFailedError &&
        e.message.includes('invalid input syntax for type integer: ')
      ) {
        throw new ClientNotFoundException();
      }
      throw e;
    }
  }

  async update(id: number, updateClientDto: UpdateClientDto) {
    const client = await this.clientRepository.findOneById(id);
    if (!client) throw new ClientNotFoundException();

    for (const contact of updateClientDto.contacts) {
      await this.contactRepository.save({
        ...contact,
        client: { id },
      });
    }

    delete updateClientDto.contacts;

    return await this.clientRepository.updateOneById(id, updateClientDto);
  }

  remove(id: number) {
    return `This action removes a #${id} client`;
  }
}

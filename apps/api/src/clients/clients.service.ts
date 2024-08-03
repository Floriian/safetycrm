import { Injectable } from '@nestjs/common';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { ClientRepository } from './repositories/client.repository';
import { ClientNotFoundException } from './exceptions/client-not-found.exception';
import { QueryFailedError } from 'typeorm';

@Injectable()
export class ClientsService {
  constructor(private readonly clientRepository: ClientRepository) {}
  async create(createClientDto: CreateClientDto) {
    try {
      const client = await this.clientRepository.store(createClientDto);
      return client;
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

  update(id: number, updateClientDto: UpdateClientDto) {
    return `This action updates a #${id} client`;
  }

  remove(id: number) {
    return `This action removes a #${id} client`;
  }
}

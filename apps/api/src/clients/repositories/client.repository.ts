import { Repository } from 'typeorm';
import { Client } from '../entities/client.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateClientDto } from '../dto/create-client.dto';

export class ClientRepository extends Repository<Client> {
  constructor(
    @InjectRepository(Client)
    private readonly clientRepository: Repository<Client>,
  ) {
    super(
      clientRepository.target,
      clientRepository.manager,
      clientRepository.queryRunner,
    );
  }

  async findOneById(id: number): Promise<Client> {
    return await this.clientRepository.findOneBy({ id });
  }

  async store(_client: CreateClientDto): Promise<Client> {
    const client = this.clientRepository.create(_client);
    return await this.clientRepository.save(client);
  }
}

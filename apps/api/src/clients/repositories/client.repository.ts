import { Repository, UpdateResult } from 'typeorm';
import { Client } from '../entities/client.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateClientDto } from '../dto/create-client.dto';
import { UpdateClientDto } from '../dto/update-client.dto';

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
    return await this.clientRepository.findOne({
      where: { id },
      relations: { contacts: true },
    });
  }

  async store(_client: CreateClientDto): Promise<Client> {
    const client = this.clientRepository.create(_client);
    return await this.clientRepository.save(client);
  }

  async updateOneById(
    id: number,
    data: Client | UpdateClientDto,
  ): Promise<UpdateResult> {
    const user = await this.clientRepository.findOneBy({ id });
    if (!user) throw new Error('User not found.');
    return await this.clientRepository.update(id, data);
  }
}

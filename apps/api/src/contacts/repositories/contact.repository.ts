import { Repository } from 'typeorm';
import { Contact } from '../entity/contact.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateContactDto } from '../dto/create-contact.dto';

export class ContactRepository extends Repository<Contact> {
  constructor(
    @InjectRepository(Contact)
    private readonly contactRepository: Repository<Contact>,
  ) {
    super(
      contactRepository.target,
      contactRepository.manager,
      contactRepository.queryRunner,
    );
  }

  async createForClient(
    clientId: number,
    dto: CreateContactDto,
  ): Promise<Contact> {
    return await this.contactRepository.create({
      client: {
        id: clientId,
      },
      ...dto,
    });
  }
}

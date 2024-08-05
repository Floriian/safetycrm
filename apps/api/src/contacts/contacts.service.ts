import { Injectable } from '@nestjs/common';

import { ContactRepository } from './repositories/contact.repository';

@Injectable()
export class ContactsService {
  constructor(private readonly contactRepository: ContactRepository) {}
  async deleteMany(id: number) {
    return await this.contactRepository.delete(id);
  }
}

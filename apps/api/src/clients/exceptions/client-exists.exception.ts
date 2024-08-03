import { BadRequestException } from '@nestjs/common';

export class ClientAlreadyExistsException extends BadRequestException {
  constructor() {
    super('Client already exists.');
  }
}

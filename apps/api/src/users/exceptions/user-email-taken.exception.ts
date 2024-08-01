import { BadRequestException } from '@nestjs/common';

export class UserEmailTakenException extends BadRequestException {
  constructor() {
    super('Email already in use.');
  }
}

import { BadRequestException } from '@nestjs/common';

export class RuleAlreadyExistsException extends BadRequestException {
  constructor() {
    super('Rule already exists.');
  }
}

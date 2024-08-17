import { NotFoundException } from '@nestjs/common';

export class RuleNotFoundException extends NotFoundException {
  constructor() {
    super('Rule not found.');
  }
}

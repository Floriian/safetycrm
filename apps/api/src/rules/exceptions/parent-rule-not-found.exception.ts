import { NotFoundException } from '@nestjs/common';

export class ParentRuleNotFoundException extends NotFoundException {
  constructor() {
    super('Parent rule not found.');
  }
}

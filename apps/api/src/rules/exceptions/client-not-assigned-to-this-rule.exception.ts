import { BadRequestException } from '@nestjs/common';

export class ClientNotAssignedToThisRule extends BadRequestException {
  constructor() {
    super('The client is not assigned to this rule.');
  }
}

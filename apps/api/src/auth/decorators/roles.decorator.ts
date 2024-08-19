import { SetMetadata } from '@nestjs/common';
import { CONSTANTS } from 'src/constants';
import { Role } from '../role.enum';

export const Roles = (...roles: Role[]) => SetMetadata(CONSTANTS.ROLES, roles);

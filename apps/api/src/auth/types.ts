import { Role } from './role.enum';

export interface JwtPayload {
  sub: number;
  email: string;
  role: Role;
}

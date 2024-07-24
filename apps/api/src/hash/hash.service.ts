import { Injectable } from '@nestjs/common';
import * as argon2 from 'argon2';
@Injectable()
export class HashService {
  async hash(payload: string) {
    return await argon2.hash(payload);
  }

  async compare(plain: string, hash: string) {
    return await argon2.verify(plain, hash);
  }
}

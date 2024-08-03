import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserRepository } from './repositories/user.repository';
import { UserNotFoundException } from './exceptions/user-not-found.exception';
import { QueryFailedError, UpdateResult } from 'typeorm';
import { UserEmailTakenException } from './exceptions/user-email-taken.exception';

@Injectable()
export class UsersService {
  constructor(private userRepository: UserRepository) {}

  async create(createUserDto: CreateUserDto) {
    try {
      const user = await this.userRepository.store(createUserDto);
      return user;
    } catch (e) {
      console.error(e);
    }
  }

  async findAll() {
    const users = await this.userRepository.find();

    const usersWithoutPassword = users.map((u) => {
      delete u.password;
      return u;
    });

    return usersWithoutPassword;
  }

  async me(id: number) {
    return this.userRepository.findOneByid(id);
  }

  async findOne(id: number) {
    try {
      const user = await this.userRepository.findOneByid(id);
      if (!user) throw new UserNotFoundException();
      delete user.password;
      return user;
    } catch (e) {
      if (
        e instanceof QueryFailedError &&
        e.message.includes('invalid input syntax for type integer: ')
      ) {
        throw new UserNotFoundException();
      }
      throw e;
    }
  }

  async update(
    id: number,
    updateUserDto: UpdateUserDto,
  ): Promise<UpdateResult> {
    try {
      await this.findOne(id);

      return await this.userRepository.updateOneById(id, updateUserDto);
    } catch (e) {
      if (e instanceof QueryFailedError) {
        if (
          e.message.includes(
            'duplicate key value violates unique constraint "unique_email"',
          )
        ) {
          throw new UserEmailTakenException();
        }
      }
      console.error(e);
    }
  }

  async remove(id: number) {
    return await this.userRepository.delete(id);
  }
}

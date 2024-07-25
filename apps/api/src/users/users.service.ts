import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserRepository } from './repositories/user.repository';
import { UserNotFoundException } from './exceptions/user-not-found.exception';

@Injectable()
export class UsersService {
  constructor(private userRepository: UserRepository) {}

  async create(createUserDto: CreateUserDto) {
    try {
      const user = await this.userRepository.store(createUserDto);
      return user;
    } catch (e) {
      console.log(e);
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
    const user = await this.userRepository.findOneByid(id);
    if (!user) throw new UserNotFoundException();
    return user;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}

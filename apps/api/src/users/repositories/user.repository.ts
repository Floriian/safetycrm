import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';

export class UserRepository extends Repository<User> {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {
    super(
      userRepository.target,
      userRepository.manager,
      userRepository.queryRunner,
    );
  }

  async findOneByEmail(email: string) {
    return await this.userRepository.findOneBy({ email });
  }

  async findOneByid(id: number) {
    return await this.userRepository.findOneBy({ id });
  }

  async store(_user: CreateUserDto) {
    const user = this.userRepository.create(_user);
    return this.userRepository.save(user);
  }

  async updateOneById(
    id: number,
    data: User | UpdateUserDto,
  ): Promise<User | undefined> {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) throw new Error('User not found.');

    return (await this.userRepository.update(id, data)).raw;
  }
}

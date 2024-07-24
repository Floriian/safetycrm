import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HashModule } from 'src/hash/hash.module';
import { JwtModule } from '@nestjs/jwt';
import { EnvModule } from 'src/env/env.module';
import { AccessTokenStrategy } from './strategies/acess-token.strategy';
import { UserRepository } from 'src/users/repositories/user.repository';
import { User } from 'src/users/entities/user.entity';

@Module({
  controllers: [AuthController],
  providers: [AuthService, AccessTokenStrategy, UserRepository],
  imports: [
    TypeOrmModule.forFeature([User]),
    HashModule,
    JwtModule.register({}),
    EnvModule,
  ],
})
export class AuthModule {}

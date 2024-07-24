import { Injectable, UnauthorizedException } from '@nestjs/common';
import { SignInDto } from './dtos/sign-in.dto';
import { UserRepository } from 'src/users/repositories/user.repository';
import { HashService } from 'src/hash/hash.service';
import { InvalidCredentialsException } from './exceptions/invalid-credentials.exception';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './types';
import { EnvService } from 'src/env/env.service';
import { CONSTANTS } from 'src/constants';
@Injectable()
export class AuthService {
  constructor(
    private userRepository: UserRepository,
    private hashService: HashService,
    private jwtService: JwtService,
    private envService: EnvService,
  ) {}
  async signIn(data: SignInDto) {
    const user = await this.userRepository.findOneByEmail(data.email);
    if (!user) throw new InvalidCredentialsException();

    const isPasswordMatches = await this.hashService.compare(
      user.password,
      data.password,
    );

    if (!isPasswordMatches) throw new UnauthorizedException();

    const payload: JwtPayload = {
      email: user.email,
      sub: user.id,
    };

    return this.generateTokens(payload);
  }

  async me(id: number) {
    return this.userRepository.findOneByid(id);
  }

  private async generateTokens(payload: JwtPayload) {
    const access_token = await this.jwtService.signAsync(payload, {
      secret: this.envService.get('AUTH_SECRET'),
      expiresIn: CONSTANTS.AT_EXPIRES,
    });
    return { access_token };
  }
}

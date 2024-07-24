import { ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';
import { CONSTANTS } from 'src/constants';

@Injectable()
export class AtGuard extends AuthGuard(CONSTANTS.AT_STRATEGY) {
  constructor(private reflector: Reflector) {
    super();
  }

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const isPublic = this.reflector.getAllAndOverride(CONSTANTS.IS_PUBLIC, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) return true;
    return this.canActivate(context);
  }
}

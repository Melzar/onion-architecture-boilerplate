import { inject, injectable } from 'inversify';
import { interfaces } from 'inversify-express-utils';
import { NextFunction, Request, Response } from 'express';

import { Principal } from 'ui/common/config/application/express/auth/models/Principal';
import { User } from 'ui/common/models/User';
import { JWTTokenUtil } from 'ui/common/config/application/common/auth/utils/JWTTokenUtil';
import { UI_APPLICATION_IDENTIFIERS } from 'ui/UiModuleSymbols';
import { TokenPayload } from 'ui/common/config/application/express/auth/types/TokenPayload';

import { DOMAIN_APPLICATION_SERVICE_IDENTIFIERS } from 'core/CoreModuleSymbols';
import { UserService } from 'core/applicationServices/User/UserService';
import { FetchUserRequest } from 'core/applicationServices/User/requests/FetchUserRequest';

@injectable()
export class ApplicationAuthProvider implements interfaces.AuthProvider {
  @inject(DOMAIN_APPLICATION_SERVICE_IDENTIFIERS.USER_SERVICE)
  private readonly userService!: UserService;

  @inject(UI_APPLICATION_IDENTIFIERS.JWT_TOKEN_UTIL)
  private readonly jwtTokenUtil!: JWTTokenUtil;

  public async getUser(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<interfaces.Principal> {
    const token = this.jwtTokenUtil.getTokenFromHeaders(req.headers);
    if (!token) {
      return new Principal(undefined);
    }
    const tokenData = await this.jwtTokenUtil.decodeToken<TokenPayload>(token);

    if (!tokenData) {
      return new Principal(undefined);
    }

    const { user } = tokenData;

    try {
      const existingUser = await this.userService.fetchUser(
        new FetchUserRequest(user.id)
      );

      if (!existingUser) {
        return new Principal(undefined);
      }

      return new Principal(
        new User(user.id, user.firstName, user.email, user.role)
      );
    } catch (error) {
      next(error);
      return new Principal(undefined);
    }
  }
}

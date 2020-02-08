import { inject, injectable } from 'inversify';
import { interfaces } from 'inversify-express-utils';
import { Request } from 'express';

import { Principal } from 'ui/config/auth/models/Principal';
import { User } from 'ui/common/models/User';
import { JWTTokenUtil } from 'ui/config/auth/utils/JWTTokenUtil';
import { UI_APPLICATION_IDENTIFIERS } from 'ui/UiModuleSymbols';
import { APP_TOKEN_SECRET } from 'ui/config/consts/variables';
import { TokenPayload } from 'ui/config/auth/types/TokenPayload';

import { DOMAIN_APPLICATION_SERVICE_IDENTIFIERS } from 'core/CoreModuleSymbols';
import { AuthenticationService } from 'core/applicationServices/Authentication/AuthenticationService';

@injectable()
export class ApplicationAuthProvider implements interfaces.AuthProvider {
  @inject(DOMAIN_APPLICATION_SERVICE_IDENTIFIERS.AUTHENTICATION_SERVICE)
  private readonly authenticationService!: AuthenticationService;

  @inject(UI_APPLICATION_IDENTIFIERS.JWT_TOKEN_UTIL)
  private readonly jwtTokenUtil!: JWTTokenUtil;

  public async getUser(req: Request): Promise<interfaces.Principal> {
    const token = this.jwtTokenUtil.getTokenFromHeaders(req.headers);
    if (!token) {
      return new Principal(undefined);
    }
    const tokenData = await this.jwtTokenUtil.decodeToken(
      token,
      APP_TOKEN_SECRET
    );

    if (!tokenData) {
      return new Principal(undefined);
    }

    const { user } = tokenData as TokenPayload;

    return new Principal(
      new User(user.id, user.firstName, user.email, user.role)
    );
  }
}

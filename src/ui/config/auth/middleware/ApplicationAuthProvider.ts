import { inject, injectable } from 'inversify';
import { interfaces } from 'inversify-express-utils';
import { Request } from 'express';

import { Principal } from 'ui/config/auth/model/Principal';
import { JWTTokenUtil } from 'ui/config/auth/util/JWTTokenUtil';
import { APPLICATION_IDENTIFIERS } from 'ui/UiModuleSymbols';
import { APP_TOKEN_SECRET } from 'ui/config/consts/variables';

import { APPLICATION_SERVICE_IDENTIFIERS } from 'core/CoreModuleSymbols';
import { AuthenticationService } from 'core/applicationServices/Authentication/AuthenticationService';

@injectable()
export class ApplicationAuthProvider implements interfaces.AuthProvider {
  @inject(APPLICATION_SERVICE_IDENTIFIERS.AUTHENTICATION_SERVICE)
  private readonly authenticationService!: AuthenticationService;

  @inject(APPLICATION_IDENTIFIERS.JWT_TOKEN_UTIL)
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

    // TODO Add double check and fetch user for verification

    if (!tokenData) {
      return new Principal(undefined);
    }

    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    // @ts-ignore
    const { user } = tokenData; // TODO temporary

    return new Principal(user);
  }
}

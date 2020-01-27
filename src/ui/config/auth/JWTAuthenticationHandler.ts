import { inject, injectable } from 'inversify';

import { APPLICATION_IDENTIFIERS } from 'ui/UiModuleSymbols';
import { JWTTokenUtil } from 'ui/config/auth/util/JWTTokenUtil';
import { IAuthenticationHandler } from 'ui/config/auth/IAuthenticationHandler';
import { APP_TOKEN_LIFE, APP_TOKEN_SECRET } from 'ui/config/consts/variables';

import { AuthenticationRequest } from 'core/domain/Authentication/AuthenticationRequest';
import { Authentication } from 'core/domain/Authentication/Authentication';

import { APPLICATION_SERVICE_IDENTIFIERS } from 'core/CoreModuleSymbols';
import { IAuthenticationService } from 'core/applicationServices/Authentication/IAuthenticationService';

@injectable()
export class JWTAuthenticationHandler implements IAuthenticationHandler {
  constructor(
      @inject(APPLICATION_IDENTIFIERS.JWT_TOKEN_UTIL) private readonly jwtTokenUtil: JWTTokenUtil,
      @inject(APPLICATION_SERVICE_IDENTIFIERS.AUTHENTICATION_SERVICE)
      private readonly authenticationService: IAuthenticationService,
  ) {}

  async authenticate(request: AuthenticationRequest) {
    const user = await this.authenticationService.verifyCredentials(request);

    if (!user) {
      return undefined;
    }

    return new Authentication(this.jwtTokenUtil.generateToken(
      user,
      'user',
      APP_TOKEN_SECRET,
      APP_TOKEN_LIFE,
    ));
  }
}

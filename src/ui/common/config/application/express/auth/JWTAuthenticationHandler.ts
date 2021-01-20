import { inject, injectable } from 'inversify';

import { getStatusText, UNAUTHORIZED } from 'http-status-codes';

import {
  UI_APPLICATION_IDENTIFIERS,
  UI_IDENTIFIERS,
  UI_MAPPINGS_IDENTIFIERS,
} from 'ui/UiModuleSymbols';
import { JWTTokenUtil } from 'ui/common/config/application/common/auth/utils/JWTTokenUtil';
import { IAuthenticationHandler } from 'ui/common/config/application/common/auth/IAuthenticationHandler';
import {
  APP_TOKEN_LIFE,
  APP_TOKEN_SECRET,
} from 'ui/common/config/consts/variables';
import { UIMapper } from 'ui/common/mappings/UIMapper';
import { User as UserUI } from 'ui/common/models/User';
import { UserInterfaceError } from 'ui/common/config/errors/UserInterfaceError';
import { Authentication } from 'ui/common/config/application/common/auth/models/Authentication';

import { AuthenticationRequest } from 'core/applicationServices/Authentication/requests/AuthenticationRequest';
import { IAuthenticationService } from 'core/applicationServices/Authentication/IAuthenticationService';

import {
  DOMAIN_APPLICATION_SERVICE_IDENTIFIERS,
  DOMAIN_MAPPING_IDENTIFIERS,
} from 'core/CoreModuleSymbols';

import { User } from 'core/domain/User/User';

const PAYLOAD_KEY = 'user';

@injectable()
export class JWTAuthenticationHandler implements IAuthenticationHandler {
  constructor(
    @inject(UI_APPLICATION_IDENTIFIERS.JWT_TOKEN_UTIL)
    private readonly jwtTokenUtil: JWTTokenUtil,
    @inject(DOMAIN_APPLICATION_SERVICE_IDENTIFIERS.AUTHENTICATION_SERVICE)
    private readonly authenticationService: IAuthenticationService,
    @inject(UI_IDENTIFIERS.UI_MAPPER)
    private readonly uiMapper: UIMapper
  ) {}

  async authenticate(request: AuthenticationRequest) {
    const user = await this.authenticationService.verifyCredentials(request);

    if (!user) {
      throw new UserInterfaceError(
        UNAUTHORIZED,
        getStatusText(UNAUTHORIZED).toUpperCase()
      );
    }

    const userUi = this.uiMapper.mapper.map<User, UserUI>(
      {
        destination: UI_MAPPINGS_IDENTIFIERS.USER_UI,
        source: DOMAIN_MAPPING_IDENTIFIERS.USER_DOMAIN,
      },
      user
    );

    return new Authentication(
      this.jwtTokenUtil.generateToken(
        userUi,
        APP_TOKEN_SECRET,
        APP_TOKEN_LIFE,
        PAYLOAD_KEY
      )
    );
  }
}

import { inject, injectable } from 'inversify';

import { getStatusText, UNAUTHORIZED } from 'http-status-codes';

import { AuthenticationError } from 'apollo-server-express';

import { IAuthenticationHandler } from 'ui/common/config/application/common/auth/IAuthenticationHandler';
import {
  UI_APPLICATION_IDENTIFIERS,
  UI_IDENTIFIERS,
  UI_MAPPINGS_IDENTIFIERS,
} from 'ui/UiModuleSymbols';
import { JWTTokenUtil } from 'ui/common/config/application/common/auth/utils/JWTTokenUtil';
import { UIMapper } from 'ui/common/mappings/UIMapper';
import { User as UserUI } from 'ui/common/models/User';
import { Authentication } from 'ui/common/config/application/common/auth/models/Authentication';
import {
  APP_TOKEN_LIFE,
  APP_TOKEN_SECRET,
} from 'ui/common/config/consts/variables';
import { GraphQLTokenPayload } from 'ui/common/config/application/apollo/auth/types/GraphQLTokenPayload';

import {
  DOMAIN_APPLICATION_SERVICE_IDENTIFIERS,
  DOMAIN_MAPPING_IDENTIFIERS,
} from 'core/CoreModuleSymbols';
import { IAuthenticationService } from 'core/applicationServices/Authentication/IAuthenticationService';
import { AuthenticationRequest } from 'core/applicationServices/Authentication/requests/AuthenticationRequest';
import { User } from 'core/domain/User/User';

@injectable()
export class GraphQLJWTAuthenticationHandler implements IAuthenticationHandler {
  constructor(
    @inject(UI_APPLICATION_IDENTIFIERS.JWT_TOKEN_UTIL)
    private readonly jwtTokenUtil: JWTTokenUtil,
    @inject(DOMAIN_APPLICATION_SERVICE_IDENTIFIERS.AUTHENTICATION_SERVICE)
    private readonly authenticationService: IAuthenticationService,
    @inject(UI_IDENTIFIERS.UI_MAPPER)
    private readonly uiMapper: UIMapper
  ) {}

  async authenticate(request: AuthenticationRequest) {
    const user = await this.authenticationService.verifyCredentials(request); // TODO Here we should have separate request object

    if (!user) {
      throw new AuthenticationError(getStatusText(UNAUTHORIZED).toUpperCase());
    }

    const { id, email, firstName, role } = this.uiMapper.mapper.map<
      User,
      UserUI
    >(
      {
        destination: UI_MAPPINGS_IDENTIFIERS.USER_UI,
        source: DOMAIN_MAPPING_IDENTIFIERS.USER_DOMAIN,
      },
      user
    );

    const payload: GraphQLTokenPayload = {
      claims: {
        role,
      },
      viewer: {
        id,
        email,
        name: firstName,
      },
    };

    return new Authentication(
      this.jwtTokenUtil.generateToken(payload, APP_TOKEN_SECRET, APP_TOKEN_LIFE)
    );
  }
}

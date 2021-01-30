import { inject } from 'inversify';
import {
  BaseHttpController,
  controller,
  httpPost,
  requestBody,
  results,
} from 'inversify-express-utils';

import { OK } from 'http-status-codes';

import { IAuthenticationHandler } from 'ui/common/config/application/common/auth/IAuthenticationHandler';
import { SignUpRequestBody } from 'ui/Portal/Authentication/rest/v1/requests/SignupRequestBody';
import { UIMapper } from 'ui/common/mappings/UIMapper';
import { User as UserUI } from 'ui/common/models/User';
import { AuthenticationRequestBody } from 'ui/Portal/Authentication/rest/v1/requests/AuthenticationRequestBody';

import {
  UI_APPLICATION_IDENTIFIERS,
  UI_IDENTIFIERS,
  UI_MAPPINGS_IDENTIFIERS,
} from 'ui/UiModuleSymbols';

import { IAuthenticationService } from 'core/applicationServices/Authentication/IAuthenticationService';
import { AuthenticationRequest } from 'core/applicationServices/Authentication/requests/AuthenticationRequest';
import { SignUpRequest } from 'core/applicationServices/Authentication/requests/SignUpRequest';
import {
  DOMAIN_APPLICATION_SERVICE_IDENTIFIERS,
  DOMAIN_MAPPING_IDENTIFIERS,
} from 'core/CoreModuleSymbols';
import { User } from 'core/domain/User/User';

@controller('/v1/auth')
export class AuthenticationController extends BaseHttpController {
  constructor(
    @inject(DOMAIN_APPLICATION_SERVICE_IDENTIFIERS.AUTHENTICATION_SERVICE)
    private readonly authenticationService: IAuthenticationService,
    @inject(UI_APPLICATION_IDENTIFIERS.JWT_AUTHENTICATION_HANDLER)
    private readonly authenticationHandler: IAuthenticationHandler,
    @inject(UI_IDENTIFIERS.UI_MAPPER)
    private readonly uiMapper: UIMapper
  ) {
    super();
  }

  @httpPost('/signup')
  public async create(
    @requestBody()
    { age, email, firstName, lastName, password }: SignUpRequestBody
  ): Promise<results.JsonResult> {
    const user = await this.authenticationService.signUp(
      new SignUpRequest(firstName, email, lastName, password, age)
    );

    const createdUser = this.uiMapper.mapper.map<User, UserUI>(
      {
        destination: UI_MAPPINGS_IDENTIFIERS.USER_UI,
        source: DOMAIN_MAPPING_IDENTIFIERS.USER_DOMAIN,
      },
      user
    );
    return this.json(createdUser, OK);
  }

  @httpPost('/')
  public async index(
    @requestBody() { email, password }: AuthenticationRequestBody
  ): Promise<results.JsonResult> {
    const authentication = await this.authenticationHandler.authenticate(
      new AuthenticationRequest(email, password)
    );

    return this.json(authentication, OK);
  }
}

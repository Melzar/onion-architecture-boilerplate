import httpStatus from 'http-status';
import { inject } from 'inversify';
import {
  BaseHttpController,
  controller,
  httpDelete,
  httpPost,
  requestBody,
  results,
} from 'inversify-express-utils';

import { IAuthenticationService } from 'core/applicationServices/Authentication/IAuthenticationService';

import { isAuthenticated } from 'ui/config/auth/middleware/IsAuthenticated';
import { IAuthenticationHandler } from 'ui/config/auth/IAuthenticationHandler';
import { AuthenticationRequestBody } from 'ui/controllers/v1/Authentication/requests/AuthenticationRequestBody';
import { SignUpRequestBody } from 'ui/controllers/v1/Authentication/requests/SignupRequestBody';
import { UI_APPLICATION_IDENTIFIERS } from 'ui/UiModuleSymbols';

import { AuthenticationRequest } from 'core/applicationServices/Authentication/requests/AuthenticationRequest';
import { USER_ROLE } from 'core/domain/User/UserRole';
import { SignUpRequest } from 'core/applicationServices/Authentication/requests/SignUpRequest';
import { DOMAIN_APPLICATION_SERVICE_IDENTIFIERS } from 'core/CoreModuleSymbols';

@controller('/v1/auth')
export class AuthenticationController extends BaseHttpController {
  constructor(
    @inject(DOMAIN_APPLICATION_SERVICE_IDENTIFIERS.AUTHENTICATION_SERVICE)
    private readonly authenticationService: IAuthenticationService,
    @inject(UI_APPLICATION_IDENTIFIERS.JWT_AUTHENTICATION_HANDLER)
    private readonly authenticationHandler: IAuthenticationHandler
  ) {
    super();
  }

  @httpPost('/signup')
  public async create(
    @requestBody()
    { age, email, firstName, lastName, password }: SignUpRequestBody
  ): Promise<results.JsonResult> {
    await this.authenticationService.signUp(
      new SignUpRequest(firstName, email, lastName, password, age)
    );
    return this.json({ status: 'OK' }, httpStatus.OK);
  }

  @httpDelete('/logout', isAuthenticated({ role: USER_ROLE.MEMBER }))
  public async delete() {
    return this.json({ status: 'OK' }, httpStatus.OK);
  }

  @httpPost('/')
  public async index(
    @requestBody() { email, password }: AuthenticationRequestBody
  ): Promise<results.JsonResult> {
    const authentication = await this.authenticationHandler.authenticate(
      new AuthenticationRequest(email, password)
    );

    if (authentication) {
      return this.json(authentication, httpStatus.OK);
    }
    return this.json(
      { code: 'UNAUTHORIZED_CODE', message: '' },
      httpStatus.UNAUTHORIZED
    );
    // TODO Example error message for error codes
  }
}

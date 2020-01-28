import httpStatus from 'http-status';
import { inject } from 'inversify';
import {
  BaseHttpController,
  controller,
  httpPost,
  requestBody,
  results,
} from 'inversify-express-utils';

import { IAuthenticationService } from 'core/applicationServices/Authentication/IAuthenticationService';
import { APPLICATION_SERVICE_IDENTIFIERS } from 'core/CoreModuleSymbols';

import { isAuthenticated } from 'ui/config/auth/middleware/IsAuthenticated';
import { AuthenticationRequestBody } from 'ui/common/requests/AuthenticationRequestBody';
import { APPLICATION_IDENTIFIERS } from 'ui/UiModuleSymbols';

import { AuthenticationRequest } from 'core/common/requests/AuthenticationRequest';
import { USER_ROLE } from 'core/domain/User/UserRole';
import { IAuthenticationHandler } from 'ui/config/auth/IAuthenticationHandler';

@controller('/v1/auth')
export class AuthenticationController extends BaseHttpController {
  constructor(
    @inject(APPLICATION_SERVICE_IDENTIFIERS.AUTHENTICATION_SERVICE)
    private readonly authenticationService: IAuthenticationService,
    @inject(APPLICATION_IDENTIFIERS.JWT_AUTHENTICATION_HANDLER)
    private readonly authenticationHandler: IAuthenticationHandler
  ) {
    super();
  }

  @httpPost('/')
  public async index(
    @requestBody() { email, password }: AuthenticationRequestBody
  ): Promise<results.JsonResult> {
    const authentication = await this.authenticationHandler.authenticate(
      new AuthenticationRequest(email, password)
    );
    if (authentication) {
      // TODO Add response objects to show example of ui mapping
      return this.json(authentication, httpStatus.OK);
    }
    return this.json(
      { code: 'UNAUTHORIZED_CODE', message: '' },
      httpStatus.UNAUTHORIZED
    ); // TODO Example error message for error codes
  }

  @httpPost('/signup')
  public async create(): Promise<results.JsonResult> {
    return this.json({ status: 'OK' }, httpStatus.OK);
  }

  @httpPost('/logout', isAuthenticated({ role: USER_ROLE.MEMBER })) // TODO just for manual testing - expected 401
  public async delete() {
    return this.json({ status: 'OK' }, httpStatus.OK);
  }
}

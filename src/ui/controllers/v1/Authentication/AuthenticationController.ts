import httpStatus from 'http-status';
import { inject } from 'inversify';
import {
  BaseHttpController, controller, httpPost, requestBody, results,
} from 'inversify-express-utils';

import { IAuthenticationService } from 'core/applicationServices/Authentication/IAuthenticationService';
import { APPLICATION_SERVICE_IDENTIFIERS } from 'core/CoreModuleSymbols';

import { isAuthenticated } from 'ui/config/auth/middleware/IsAuthenticated';
import { AuthenticationRequestBody } from 'ui/controllers/v1/Authentication/requests/AuthenticationRequestBody';
import { AuthenticationRequest } from 'core/domain/Authentication/AuthenticationRequest';

@controller('/v1/auth')
export class AuthenticationController extends BaseHttpController {
    private readonly authenticationService: IAuthenticationService;

    constructor(
        @inject(APPLICATION_SERVICE_IDENTIFIERS.AUTHENTICATION_SERVICE)
          authenticationService: IAuthenticationService,
    ) {
      super();
      this.authenticationService = authenticationService;
    }

    @httpPost('/')
    public async index(@requestBody() { email, password }: AuthenticationRequestBody): Promise<results.JsonResult> {
      const authentication = await this.authenticationService.authenticate(new AuthenticationRequest(email, password));
      if (authentication) {
        // TODO Add response objects to show example of ui mapping
        return this.json(authentication, httpStatus.OK);
      }
      return this.json(
        { code: 'UNAUTHORIZED_CODE', message: '' },
        httpStatus.UNAUTHORIZED,
      ); // TODO Example error message for error codes
    }

    @httpPost('/signup')
    public async create(): Promise<results.JsonResult> {
      return this.json({ status: 'OK' }, httpStatus.OK);
    }

    @httpPost('/logout', isAuthenticated({ role: 'User' })) // TODO just for manual testing - expected 401
    public async delete() {
      return this.json({ status: 'OK' }, httpStatus.OK);
    }
}

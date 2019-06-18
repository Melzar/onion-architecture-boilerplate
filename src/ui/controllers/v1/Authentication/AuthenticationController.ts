import httpStatus from 'http-status';
import { inject } from 'inversify';
import {
  BaseHttpController, controller, httpPost, requestBody, results,
} from 'inversify-express-utils';

import { IAuthenticationService } from 'core/applicationServices/Authentication/IAuthenticationService';
import { APPLICATION_SERVICE_IDENTIFIERS } from 'core/CoreModuleSymbols';

import { isAuthenticated } from 'ui/config/auth/middleware/IsAuthenticated';
import { Request } from 'express';

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
    public async index(@requestBody() body: Request): Promise<results.JsonResult> {
      // @ts-ignore // TODO temporary ignore
      const token = this.authenticationService.authenticate(body.email, body.password);
      if (token) {
        return this.json({ token }, httpStatus.OK); // TODO Add response objects
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

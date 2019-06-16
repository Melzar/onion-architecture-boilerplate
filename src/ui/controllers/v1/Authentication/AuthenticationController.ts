import httpStatus from 'http-status';
import { inject } from 'inversify';
import { BaseHttpController, controller, httpPost, results, } from 'inversify-express-utils';

import { IAuthenticationService } from 'core/applicationServices/Authentication/IAuthenticationService';
import { AUTHENTICATION_IDENTIFIERS } from 'dependency/core/AuthenticationModuleSymbols';

@controller('/v1/auth')
export class AuthenticationController extends BaseHttpController {
    private readonly authenticationService: IAuthenticationService;

    constructor(
        @inject(AUTHENTICATION_IDENTIFIERS.AUTHENTICATION_SERVICE)
          authenticationService: IAuthenticationService,
    ) {
      super();
      this.authenticationService = authenticationService;
    }

    @httpPost('/')
    public async authenticate(): Promise<results.JsonResult> {
      return this.json({ status: 'OK' }, httpStatus.OK);
    }

    @httpPost('/signup')
    public async signUp(): Promise<results.JsonResult> {
      return this.json({ status: 'OK' }, httpStatus.OK);
    }
}

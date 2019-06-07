import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { inject, injectable } from 'inversify';

import { IAuthenticationService } from 'core/applicationServices/Authentication/IAuthenticationService';
import { AuthenticationService } from 'core/applicationServices/Authentication/AuthenticationService';

@injectable()
export class AuthenticationController {
    private readonly authenticationService: IAuthenticationService;

    constructor(@inject(AuthenticationService) authenticationService: IAuthenticationService) {
      this.authenticationService = authenticationService;
    }

    public authenticate(req: Request, res: Response): Response {
      return res.status(httpStatus.OK).json({ status: 'OK' });
    }

    public signUp(req: Request, res: Response): Response {
      return res.status(httpStatus.OK).json({ status: 'OK' });
    }
}

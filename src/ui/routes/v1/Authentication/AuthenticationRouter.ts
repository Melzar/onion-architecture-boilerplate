import express from 'express';
import core from 'express-serve-static-core';
import { inject, injectable } from 'inversify';

import { BaseRouter } from 'ui/routes/BaseRouter';
import { AuthenticationController } from 'ui/controllers/Authentication/AuthenticationController';
import { AUTHENTICATION_IDENTIFIERS } from 'dependency/common/AuthenticationModuleSymbols';

@injectable()
export class AuthenticationRouter extends BaseRouter<core.Router> {
  private readonly authenticationController: AuthenticationController;

  constructor(@inject(AUTHENTICATION_IDENTIFIERS.AUTHENTICATION_CONTROLLER)
    authenticationController: AuthenticationController) {
    super(express.Router());
    this.authenticationController = authenticationController;
  }

  public initialize(): void {
    /**
     * NAMESPACE /v1/auth/
     * @Description Route which returns status - just for testing
     */
    this.router.post('/', this.authenticationController.authenticate);
  }
}

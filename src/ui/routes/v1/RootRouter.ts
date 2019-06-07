import express from 'express';
import core from 'express-serve-static-core';
import { inject, injectable } from 'inversify';

import { BaseRouter } from 'ui/routes/BaseRouter';
import { AuthenticationRouter } from 'ui/routes/v1/Authentication/AuthenticationRouter';
import { AUTHENTICATION_IDENTIFIERS } from 'dependency/common/AuthenticationModuleSymbols';

@injectable()
export class RootRouter extends BaseRouter<core.Router> {
  private readonly authenticationRouter: AuthenticationRouter;

  constructor(
    @inject(AUTHENTICATION_IDENTIFIERS.AUTHENTICATION_ROUTER) authenticationRouter: AuthenticationRouter,
  ) {
    super(express.Router()); // TODO Deliver via di
    this.authenticationRouter = authenticationRouter;
  }

  public initialize(): void {
    /**
         * NAMESPACE v1/auth
         * @Description routes related to authentication
         */
    this.authenticationRouter.initialize();
    this.router.use('/auth', this.authenticationRouter.getRouter());
  }
}

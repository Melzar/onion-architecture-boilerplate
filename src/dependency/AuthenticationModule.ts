import { interfaces } from 'inversify';
import { BaseModule } from 'dependency/BaseModule';
import { IAuthenticationService } from 'core/applicationServices/Authentication/IAuthenticationService';
import { AuthenticationService } from 'core/applicationServices/Authentication/AuthenticationService';
import { AuthenticationController } from 'ui/controllers/Authentication/AuthenticationController';
import { AuthenticationRouter } from 'ui/routes/v1/Authentication/AuthenticationRouter';

import { AUTHENTICATION_IDENTIFIERS } from 'dependency/common/AuthenticationModuleSymbols';

export class AuthenticationModule extends BaseModule {
  constructor() {
    super((bind: interfaces.Bind) => {
      this.init(bind);
    });
  }

  public init(bind: interfaces.Bind): void {
    this.provideAuthenticationService(bind);
    this.provideAuthenticationController(bind);
    this.provideAuthenticationRouter(bind);
  }

  private provideAuthenticationService(bind: interfaces.Bind): void {
    bind<IAuthenticationService>(AUTHENTICATION_IDENTIFIERS.AUTHENTICATION_SERVICE).to(AuthenticationService);
  }

  private provideAuthenticationController(bind: interfaces.Bind): void {
    bind<AuthenticationController>(AUTHENTICATION_IDENTIFIERS.AUTHENTICATION_CONTROLLER).to(AuthenticationController);
  }

  private provideAuthenticationRouter(bind: interfaces.Bind): void {
    bind<AuthenticationRouter>(AUTHENTICATION_IDENTIFIERS.AUTHENTICATION_ROUTER).to(AuthenticationRouter);
  }
}

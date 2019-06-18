import { interfaces } from 'inversify';
import { BaseModule } from 'dependency/BaseModule';
import { IAuthenticationService } from 'core/applicationServices/Authentication/IAuthenticationService';
import { AuthenticationService } from 'ui/config/auth/AuthenticationService';

import { APPLICATION_SERVICE_IDENTIFIERS } from 'core/CoreModuleSymbols';

export class AuthenticationModule extends BaseModule {
  constructor() {
    super((bind: interfaces.Bind): void => {
      this.init(bind);
    });
  }

  public init(bind: interfaces.Bind): void {
    this.provideAuthenticationService(bind);
  }

  private provideAuthenticationService(bind: interfaces.Bind): void {
    bind<IAuthenticationService>(APPLICATION_SERVICE_IDENTIFIERS.AUTHENTICATION_SERVICE).to(AuthenticationService);
  }
}

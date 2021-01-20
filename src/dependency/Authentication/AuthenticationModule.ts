import { interfaces } from 'inversify';

import { BaseModule } from 'dependency/BaseModule';

import { IAuthenticationService } from 'core/applicationServices/Authentication/IAuthenticationService';
import { AuthenticationService } from 'core/applicationServices/Authentication/AuthenticationService';

import { DOMAIN_APPLICATION_SERVICE_IDENTIFIERS } from 'core/CoreModuleSymbols';

import { UI_SCHEMA_IDENTIFIERS } from 'ui/UiModuleSymbols';
import { AuthenticationMutation } from 'ui/Authentication/graphql/AuthenticationMutation';
import { IResolver } from 'ui/common/config/application/apollo/common/IResolver';

export class AuthenticationModule extends BaseModule {
  constructor() {
    super((bind: interfaces.Bind): void => {
      this.init(bind);
    });
  }

  public init(bind: interfaces.Bind): void {
    this.provideAuthenticationService(bind);

    this.provideAuthenticationMutation(bind);
  }

  private provideAuthenticationService(bind: interfaces.Bind): void {
    bind<IAuthenticationService>(
      DOMAIN_APPLICATION_SERVICE_IDENTIFIERS.AUTHENTICATION_SERVICE
    ).to(AuthenticationService);
  }

  private provideAuthenticationMutation(bind: interfaces.Bind): void {
    bind<IResolver>(UI_SCHEMA_IDENTIFIERS.AUTHENTICATION_MUTATIONS).to(
      AuthenticationMutation
    );
  }
}

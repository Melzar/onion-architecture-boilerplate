import { interfaces } from 'inversify';

import { BaseModule } from 'dependency/BaseModule';
import { IResolver } from 'ui/common/config/application/apollo/common/IResolver';
import { UserQuery } from 'ui/Portal/User/graphql/UserQuery';
import { UI_SCHEMA_IDENTIFIERS } from 'ui/UiModuleSymbols';

export class UserModule extends BaseModule {
  constructor() {
    super((bind: interfaces.Bind): void => {
      this.init(bind);
    });
  }

  public init(bind: interfaces.Bind): void {
    this.provideUserQuery(bind);
  }

  private provideUserQuery(bind: interfaces.Bind): void {
    bind<IResolver>(UI_SCHEMA_IDENTIFIERS.PORTAL_USER_QUERIES).to(UserQuery);
  }
}

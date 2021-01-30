import { interfaces } from 'inversify';

import { BaseModule } from 'dependency/BaseModule';
import { UI_SCHEMA_IDENTIFIERS } from 'ui/UiModuleSymbols';
import { IResolver } from 'ui/common/config/application/apollo/common/IResolver';
import { UserQuery } from 'ui/Administration/User/graphql/UserQuery';
import { UserMutation } from 'ui/Administration/User/graphql/UserMutation';
import { UserSubQuery } from 'ui/Administration/User/graphql/UserSubQuery';

export class UserModule extends BaseModule {
  constructor() {
    super((bind: interfaces.Bind): void => {
      this.init(bind);
    });
  }

  public init(bind: interfaces.Bind): void {
    this.provideUserQuery(bind);
    this.provideUserMutation(bind);
    this.provideUserSubquery(bind);
  }

  private provideUserQuery(bind: interfaces.Bind): void {
    bind<IResolver>(UI_SCHEMA_IDENTIFIERS.ADMINISTRATION_USER_QUERIES).to(
      UserQuery
    );
  }

  private provideUserMutation(bind: interfaces.Bind): void {
    bind<IResolver>(UI_SCHEMA_IDENTIFIERS.ADMINISTRATION_USER_MUTATIONS).to(
      UserMutation
    );
  }

  private provideUserSubquery(bind: interfaces.Bind): void {
    bind<IResolver>(UI_SCHEMA_IDENTIFIERS.ADMINISTRATION_USER_SUBQUERIES).to(
      UserSubQuery
    );
  }
}

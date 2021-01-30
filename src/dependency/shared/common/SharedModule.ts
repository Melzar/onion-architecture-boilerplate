import { interfaces } from 'inversify';

import { BaseModule } from 'dependency/BaseModule';
import { IResolver } from 'ui/common/config/application/apollo/common/IResolver';
import { UI_SCHEMA_IDENTIFIERS } from 'ui/UiModuleSymbols';
import { SharedQuery } from 'ui/shared/common/graphql/SharedQuery';
import { SharedMutation } from 'ui/shared/common/graphql/SharedMutation';
import { SharedSubQuery } from 'ui/shared/common/graphql/SharedSubQuery';

export class SharedModule extends BaseModule {
  constructor() {
    super((bind: interfaces.Bind): void => {
      this.init(bind);
    });
  }

  init(bind: interfaces.Bind): void {
    this.provideSharedQuery(bind);
    this.provideSharedMutation(bind);
    this.provideSharedSubQuery(bind);
  }

  private provideSharedQuery(bind: interfaces.Bind): void {
    bind<IResolver>(UI_SCHEMA_IDENTIFIERS.SHARED_QUERIES).to(SharedQuery);
  }

  private provideSharedMutation(bind: interfaces.Bind): void {
    bind<IResolver>(UI_SCHEMA_IDENTIFIERS.SHARED_MUTATIONS).to(SharedMutation);
  }

  private provideSharedSubQuery(bind: interfaces.Bind): void {
    bind<IResolver>(UI_SCHEMA_IDENTIFIERS.SHARED_SUBQUERIES).to(SharedSubQuery);
  }
}

import { interfaces } from 'inversify';

import { BaseModule } from 'dependency/BaseModule';
import { IResolver } from 'ui/common/config/application/apollo/common/IResolver';
import { UI_SCHEMA_IDENTIFIERS } from 'ui/UiModuleSymbols';
import { PortalQuery } from 'ui/Portal/common/graphql/PortalQuery';
import { PortalMutation } from 'ui/Portal/common/graphql/PortalMutation';
import { PortalSubQuery } from 'ui/Portal/common/graphql/PortalSubQuery';

export class PortalModule extends BaseModule {
  constructor() {
    super((bind: interfaces.Bind): void => {
      this.init(bind);
    });
  }

  init(bind: interfaces.Bind): void {
    this.providePortalQuery(bind);
    this.providePortalMutation(bind);
    this.providePortalSubQuery(bind);
  }

  private providePortalQuery(bind: interfaces.Bind): void {
    bind<IResolver>(UI_SCHEMA_IDENTIFIERS.PORTAL_QUERIES).to(PortalQuery);
  }

  private providePortalMutation(bind: interfaces.Bind): void {
    bind<IResolver>(UI_SCHEMA_IDENTIFIERS.PORTAL_MUTATIONS).to(PortalMutation);
  }

  private providePortalSubQuery(bind: interfaces.Bind): void {
    bind<IResolver>(UI_SCHEMA_IDENTIFIERS.PORTAL_SUBQUERIES).to(PortalSubQuery);
  }
}

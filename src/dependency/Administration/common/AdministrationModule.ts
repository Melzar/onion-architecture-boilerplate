import { interfaces } from 'inversify';

import { BaseModule } from 'dependency/BaseModule';
import { UI_SCHEMA_IDENTIFIERS } from 'ui/UiModuleSymbols';
import { AdministrationQuery } from 'ui/Administration/common/graphql/AdministrationQuery';
import { AdministrationMutation } from 'ui/Administration/common/graphql/AdministrationMutation';
import { AdministrationSubQuery } from 'ui/Administration/common/graphql/AdministrationSubQuery';
import { IResolver } from 'ui/common/config/application/apollo/common/IResolver';

export class AdministrationModule extends BaseModule {
  constructor() {
    super((bind: interfaces.Bind): void => {
      this.init(bind);
    });
  }

  init(bind: interfaces.Bind): void {
    this.provideAdministrationQuery(bind);
    this.provideAdministrationMutation(bind);
    this.provideAdministrationSubQuery(bind);
  }

  private provideAdministrationQuery(bind: interfaces.Bind): void {
    bind<IResolver>(UI_SCHEMA_IDENTIFIERS.ADMINISTRATION_QUERIES).to(
      AdministrationQuery
    );
  }

  private provideAdministrationMutation(bind: interfaces.Bind): void {
    bind<IResolver>(UI_SCHEMA_IDENTIFIERS.ADMINISTRATION_MUTATIONS).to(
      AdministrationMutation
    );
  }

  private provideAdministrationSubQuery(bind: interfaces.Bind): void {
    bind<IResolver>(UI_SCHEMA_IDENTIFIERS.ADMINISTRATION_SUBQUERIES).to(
      AdministrationSubQuery
    );
  }
}

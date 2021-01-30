import { interfaces } from 'inversify';

import { BaseModule } from 'dependency/BaseModule';
import { IResolver } from 'ui/common/config/application/apollo/common/IResolver';
import { UI_SCHEMA_IDENTIFIERS } from 'ui/UiModuleSymbols';
import { EquipmentQuery } from 'ui/Portal/Equipment/graphql/EquipmentQueries';
import { IUserEquipmentService } from 'core/applicationServices/User/IUserEquipmentService';
import { DOMAIN_APPLICATION_SERVICE_IDENTIFIERS } from 'core/CoreModuleSymbols';
import { UserEquipmentService } from 'core/applicationServices/User/UserEquipmentService';

export class EquipmentModule extends BaseModule {
  constructor() {
    super((bind: interfaces.Bind): void => {
      this.init(bind);
    });
  }

  public init(bind: interfaces.Bind): void {
    this.provideUserEquipmentService(bind);

    this.provideEquipmentQuery(bind);
  }

  private provideUserEquipmentService(bind: interfaces.Bind): void {
    bind<IUserEquipmentService>(
      DOMAIN_APPLICATION_SERVICE_IDENTIFIERS.USER_EQUIPMENT_SERVICE
    ).to(UserEquipmentService);
  }

  private provideEquipmentQuery(bind: interfaces.Bind): void {
    bind<IResolver>(UI_SCHEMA_IDENTIFIERS.PORTAL_EQUIPMENT_QUERIES).to(
      EquipmentQuery
    );
  }
}

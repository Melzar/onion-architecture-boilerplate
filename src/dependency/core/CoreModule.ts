import { interfaces } from 'inversify';

import { BaseModule } from 'dependency/BaseModule';

import { IAuthenticationService } from 'core/applicationServices/Authentication/IAuthenticationService';
import { DOMAIN_APPLICATION_SERVICE_IDENTIFIERS } from 'core/CoreModuleSymbols';
import { AuthenticationService } from 'core/applicationServices/Authentication/AuthenticationService';
import { IEquipmentService } from 'core/applicationServices/Equipment/IEquipmentService';
import { EquipmentService } from 'core/applicationServices/Equipment/EquipmentService';
import { IUserService } from 'core/applicationServices/User/IUserService';
import { UserService } from 'core/applicationServices/User/UserService';

export class CoreModule extends BaseModule {
  constructor() {
    super((bind: interfaces.Bind): void => {
      this.init(bind);
    });
  }

  public init(bind: interfaces.Bind): void {
    this.provideAuthenticationService(bind);
    this.provideEquipmentService(bind);
    this.provideUserService(bind);
  }

  private provideAuthenticationService(bind: interfaces.Bind): void {
    bind<IAuthenticationService>(
      DOMAIN_APPLICATION_SERVICE_IDENTIFIERS.AUTHENTICATION_SERVICE
    ).to(AuthenticationService);
  }

  private provideEquipmentService(bind: interfaces.Bind): void {
    bind<IEquipmentService>(
      DOMAIN_APPLICATION_SERVICE_IDENTIFIERS.EQUIPMENT_SERVICE
    ).to(EquipmentService);
  }

  private provideUserService(bind: interfaces.Bind): void {
    bind<IUserService>(DOMAIN_APPLICATION_SERVICE_IDENTIFIERS.USER_SERVICE).to(
      UserService
    );
  }
}

import { InversifyExpressServer } from 'inversify-express-utils';

import express from 'express';

import { errorHandler } from 'ui/common/config/errors/handlers/errorHandler';

import { ExpressApplication } from 'ui/common/config/application/express/ExpressApplication';
import { ApplicationAuthProvider } from 'ui/common/config/application/express/auth/middlewares/ApplicationAuthProvider';
import { UI_APPLICATION_IDENTIFIERS } from 'ui/UiModuleSymbols';

import { BaseContainer } from 'dependency/BaseContainer';
import { ApplicationModule } from 'dependency/common/ApplicationModule';
import { CommonModule } from 'dependency/common/CommonModule';
import { AuthenticationModule } from 'dependency/shared/Authentication/AuthenticationModule';
import { UserModule } from 'dependency/shared/User/UserModule';
import { UserModule as PortalUserModule } from 'dependency/Portal/User/UserModule';
import { UserModule as AdministrationUserModule } from 'dependency/Administration/User/UserModule';
import { WarehouseModule as AdministrationWarehouseModule } from 'dependency/Administration/Warehouse/WarehouseModule';
import { RoleModule } from 'dependency/Administration/Role/RoleModule';
import { RateModule } from 'dependency/Administration/Rate/RateModule';
import { StateModule } from 'dependency/Administration/State/StateModule';
import { EquipmentModule as UserEquipmentModule } from 'dependency/Portal/Equipment/EquipmentModule';
import { EquipmentModule } from 'dependency/shared/Equipment/EquipmentModule';
import { AdministrationModule } from 'dependency/Administration/common/AdministrationModule';
import { PortalModule } from 'dependency/Portal/common/PortalModule';
import { SharedModule } from 'dependency/shared/common/SharedModule';
import { WarehouseModule } from 'dependency/shared/Warehouse/WarehouseModule';

export class AppContainer extends BaseContainer {
  constructor() {
    super({
      defaultScope: 'Singleton',
      skipBaseClassChecks: true,
    });
  }

  /**
   * @description Order of initialization matters
   */
  init(): void {
    this.provideCommonModule();

    this.provideApplicationModule();

    this.initializeSharedNamespace();
    this.initializeAdministrationNamespace();
    this.initializePortalNamespace();

    this.provideInversifyExpressApplication();
  }

  private initializeSharedNamespace(): void {
    this.provideAuthenticationModule();
    this.provideEquipmentModule();
    this.provideUserModule();
    this.provideWarehouseModule();

    this.provideSharedModule();
  }

  private initializeAdministrationNamespace(): void {
    this.provideRoleModule();
    this.provideRateModule();
    this.provideStateModule();
    this.provideAdministrationUserModule();
    this.provideAdministrationWarehouseModule();

    this.provideAdministrationModule();
  }

  private initializePortalNamespace(): void {
    this.provideUserEquipmentModule();
    this.providePortalUserModule();

    this.providePortalModule();
  }

  private provideApplicationModule(): void {
    this.load(new ApplicationModule());
  }

  private provideCommonModule(): void {
    this.load(new CommonModule());
  }

  private provideAuthenticationModule(): void {
    this.load(new AuthenticationModule());
  }

  private provideRateModule(): void {
    this.load(new RateModule());
  }

  private provideUserModule(): void {
    this.load(new UserModule());
  }

  private provideWarehouseModule(): void {
    this.load(new WarehouseModule());
  }

  private provideSharedModule(): void {
    this.load(new SharedModule());
  }

  private provideStateModule(): void {
    this.load(new StateModule());
  }

  private provideAdministrationUserModule(): void {
    this.load(new AdministrationUserModule());
  }

  private provideAdministrationWarehouseModule(): void {
    this.load(new AdministrationWarehouseModule());
  }

  private provideAdministrationModule(): void {
    this.load(new AdministrationModule());
  }

  private provideRoleModule(): void {
    this.load(new RoleModule());
  }

  private provideEquipmentModule(): void {
    this.load(new EquipmentModule());
  }

  private provideUserEquipmentModule(): void {
    this.load(new UserEquipmentModule());
  }

  private providePortalUserModule(): void {
    this.load(new PortalUserModule());
  }

  private providePortalModule(): void {
    this.load(new PortalModule());
  }

  private provideInversifyExpressApplication(): void {
    this.bind<InversifyExpressServer>(
      UI_APPLICATION_IDENTIFIERS.INVERSIFY_APPLICATION
    ).toConstantValue(
      new InversifyExpressServer(
        this,
        this.get<express.Router>(UI_APPLICATION_IDENTIFIERS.EXPRESS_ROUTER),
        { rootPath: '/' },
        this.get<ExpressApplication>(
          UI_APPLICATION_IDENTIFIERS.EXPRESS_APPLICATION
        ).getApplication(),
        ApplicationAuthProvider
      ).setErrorConfig(errorHandler)
    );
  }
}

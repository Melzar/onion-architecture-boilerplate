import { InversifyExpressServer } from 'inversify-express-utils';

import { errorHandler } from 'ui/common/config/errors/handlers/errorHandler';

import { ExpressApplication } from 'ui/common/config/application/express/ExpressApplication';
import { ApplicationAuthProvider } from 'ui/common/config/application/express/auth/middlewares/ApplicationAuthProvider';
import { UI_APPLICATION_IDENTIFIERS } from 'ui/UiModuleSymbols';

import { BaseContainer } from 'dependency/BaseContainer';
import { ApplicationModule } from 'dependency/common/ApplicationModule';
import { CommonModule } from 'dependency/common/CommonModule';
import { AuthenticationModule } from 'dependency/Authentication/AuthenticationModule';
import { UserModule } from 'dependency/User/UserModule';
import { RoleModule } from 'dependency/Role/RoleModule';
import { EquipmentModule } from 'dependency/Equipment/EquipmentModule';
import { RateModule } from 'dependency/Rate/RateModule';
import { StateModule } from 'dependency/State/StateModule';

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

    this.provideRoleModule();
    this.provideRateModule();
    this.provideUserModule();
    this.provideStateModule();
    this.provideEquipmentModule();
    this.provideAuthenticationModule();

    this.provideInversifyExpressApplication();
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

  private provideStateModule(): void {
    this.load(new StateModule());
  }

  private provideRoleModule(): void {
    this.load(new RoleModule());
  }

  private provideEquipmentModule(): void {
    this.load(new EquipmentModule());
  }

  private provideInversifyExpressApplication(): void {
    this.bind<InversifyExpressServer>(
      UI_APPLICATION_IDENTIFIERS.INVERSIFY_APPLICATION
    ).toConstantValue(
      new InversifyExpressServer(
        this,
        null,
        { rootPath: '/' },
        this.get<ExpressApplication>(
          UI_APPLICATION_IDENTIFIERS.EXPRESS_APPLICATION
        ).getApplication(),
        ApplicationAuthProvider
      ).setErrorConfig(errorHandler)
    );
  }
}

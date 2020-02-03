import { InversifyExpressServer } from 'inversify-express-utils';

import { BaseContainer } from 'dependency/BaseContainer';
import { DatabaseModule } from 'dependency/infrastructure/DatabaseModule';
import { ApplicationModule } from 'dependency/ui/ApplicationModule';
import { InfrastructureModule } from 'dependency/infrastructure/InfrastructureModule';

import { ExpressApplication } from 'ui/config/application/ExpressApplication';
import { ApplicationAuthProvider } from 'ui/config/auth/middleware/ApplicationAuthProvider';
import { UI_APPLICATION_IDENTIFIERS } from 'ui/UiModuleSymbols';
import { UIModule } from 'dependency/ui/UIModule';
import { CoreModule } from 'dependency/core/CoreModule';

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
    this.provideDatabaseModule();

    this.provideInfrastructureModule();

    this.provideCoreModule();

    this.provideApplicationModule();

    this.provideInversifyExpressApplication();

    this.provideUIModule();
  }

  private provideDatabaseModule(): void {
    this.load(new DatabaseModule());
  }

  private provideInfrastructureModule(): void {
    this.load(new InfrastructureModule());
  }

  private provideApplicationModule(): void {
    this.load(new ApplicationModule());
  }

  private provideCoreModule(): void {
    this.load(new CoreModule());
  }

  private provideUIModule(): void {
    this.load(new UIModule());
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
      )
    );
  }
}

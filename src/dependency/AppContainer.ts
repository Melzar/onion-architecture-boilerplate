import { BaseContainer } from 'dependency/BaseContainer';
import { DatabaseModule } from 'dependency/infrastructure/DatabaseModule';
import { AuthenticationModule } from 'dependency/core/AuthenticationModule';
import { ApplicationModule } from 'dependency/ui/ApplicationModule';
import { InfrastructureModule } from 'dependency/infrastructure/InfrastructureModule';
import { InversifyExpressServer } from 'inversify-express-utils';
import { ExpressApplication } from 'ui/config/application/ExpressApplication';
import { APPLICATION_IDENTIFIERS } from 'dependency/ui/ApplicationModuleSymbols';

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

    this.provideAuthenticationModule();

    this.provideApplicationModule();

    this.provideInversifyExpressApplication();
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

  private provideAuthenticationModule(): void {
    this.load(new AuthenticationModule());
  }

  private provideInversifyExpressApplication(): void {
    this.bind<InversifyExpressServer>(APPLICATION_IDENTIFIERS.INVERSIFY_APPLICATION)
      .toConstantValue(new InversifyExpressServer(
        this,
        null,
        { rootPath: '/api' },
        this.get<ExpressApplication>(APPLICATION_IDENTIFIERS.EXPRESS_APPLICATION).getApplication(),
      ));
  }
}

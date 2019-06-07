import { BaseContainer } from 'dependency/BaseContainer';
import { DatabaseModule } from 'dependency/common/DatabaseModule';
import { NetworkModule } from 'dependency/common/NetworkModule';
import { AuthenticationModule } from 'dependency/AuthenticationModule';
import { ApplicationModule } from 'dependency/common/ApplicationModule';
import { InfrastructureModule } from 'dependency/common/InfrastructureModule';

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
    this.provideNetworkModule();

    this.provideInfrastructureModule();

    this.provideAuthenticationModule();

    this.provideApplicationModule();
  }

  private provideDatabaseModule(): void {
    this.load(new DatabaseModule());
  }

  private provideNetworkModule(): void {
    this.load(new NetworkModule());
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
}

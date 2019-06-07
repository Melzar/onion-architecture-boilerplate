import { BaseContainer } from 'dependency/BaseContainer';
import { DatabaseModule } from 'dependency/common/DatabaseModule';
import { NetworkModule } from 'dependency/common/NetworkModule';
import { AuthenticationModule } from 'dependency/AuthenticationModule';
import { ApplicationModule } from 'dependency/common/ApplicationModule';

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

    this.provideAuthenticationModule();

    this.provideApplicationModule();
  }

  private provideDatabaseModule(): void {
    this.load(new DatabaseModule());
  }

  private provideNetworkModule(): void {
    this.load(new NetworkModule());
  }

  private provideApplicationModule(): void {
    this.load(new ApplicationModule());
  }

  private provideAuthenticationModule(): void {
    this.load(new AuthenticationModule());
  }
}

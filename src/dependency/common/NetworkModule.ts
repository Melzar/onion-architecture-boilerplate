import { BaseModule } from 'dependency/BaseModule';
import { interfaces } from 'inversify';

export const NETWORK_IDENTIFIERS = {
  API_ENDPOINT: Symbol.for('ApiEndpoint'),
};

export class NetworkModule extends BaseModule {
  constructor() {
    super((bind: interfaces.Bind) => {
      this.init(bind);
    });
  }

  public init(bind: interfaces.Bind): void {
    this.provideApiEndpoint(bind);
  }

  private provideApiEndpoint(bind: interfaces.Bind): void {
    bind(NETWORK_IDENTIFIERS.API_ENDPOINT)
      .toConstantValue('http://localhost:8000/api');
  }
}

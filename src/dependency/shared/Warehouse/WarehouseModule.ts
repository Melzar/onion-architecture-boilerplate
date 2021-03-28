import { interfaces } from 'inversify';

import { BaseModule } from 'dependency/BaseModule';

// TODO Remove it if not used in future
export class WarehouseModule extends BaseModule {
  constructor() {
    super((bind: interfaces.Bind): void => {
      this.init(bind);
    });
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function,no-unused-vars
  public init(bind: interfaces.Bind): void {}
}

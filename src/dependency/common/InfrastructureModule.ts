import { BaseModule } from 'dependency/BaseModule';
import { interfaces } from 'inversify';
import { IMapper } from 'infrastructure/common/mapper/IMapper';
import { INFRASTRUCTURE_SYMBOLS } from 'dependency/common/InfrastructureModuleSymbols';
import { UserMapper } from 'infrastructure/common/mapper/UserMapper';

export class InfrastructureModule extends BaseModule {
  constructor() {
    super((bind: interfaces.Bind) => {
      this.init(bind);
    });
  }

  public init(bind: interfaces.Bind): void {
    this.provideUserMapper(bind);
  }

  private provideUserMapper(bind: interfaces.Bind): void {
    bind<IMapper>(INFRASTRUCTURE_SYMBOLS.USER_MAPPER).to(UserMapper);
  }
}

import { interfaces } from 'inversify';

import { BaseModule } from 'dependency/BaseModule';

import { IMapper } from 'core/common/mapper/IMapper';

import { UserDomainToUserUIMapper } from 'ui/common/mappings/User/UserDomainToUserUIMapper';
import { UIMapper } from 'ui/common/mappings/UIMapper';

import { UI_IDENTIFIERS } from 'ui/UiModuleSymbols';

export class UIModule extends BaseModule {
  constructor() {
    super((bind: interfaces.Bind): void => {
      this.init(bind);
    });
  }

  init(bind: interfaces.Bind): void {
    this.provideUIMapper(bind);
    this.provideUserMapper(bind);
  }

  private provideUIMapper(bind: interfaces.Bind): void {
    bind<UIMapper>(UI_IDENTIFIERS.UI_MAPPER).to(UIMapper);
  }

  private provideUserMapper(bind: interfaces.Bind): void {
    bind<IMapper>(UI_IDENTIFIERS.USER_MAPPER).to(UserDomainToUserUIMapper);
  }
}

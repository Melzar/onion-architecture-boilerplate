import { inject, injectable } from 'inversify';
import { Mapper } from '@wufe/mapper';

import { IMapper } from 'core/common/mapper/IMapper';
import { UI_IDENTIFIERS } from 'ui/UiModuleSymbols';

@injectable()
export class UIMapper {
  public readonly mapper: Mapper;

  constructor(
    @inject(UI_IDENTIFIERS.USER_MAPPER)
    private readonly userDomainToUserUIMapper: IMapper
  ) {
    this.mapper = new Mapper().withConfiguration(configuration =>
      configuration
        .shouldIgnoreSourcePropertiesIfNotInDestination(true)
        .shouldAutomaticallyMapArrays(true)
    );

    this.initialize();
  }

  private initialize(): void {
    this.userDomainToUserUIMapper.configureMappings(this.mapper);
  }
}

import { injectable } from 'inversify';

import { Mapper } from '@wufe/mapper';

import { IMapper } from 'core/common/mapper/IMapper';

import { User } from 'core/domain/User/User';
import { DOMAIN_MAPPING_IDENTIFIERS } from 'core/CoreModuleSymbols';

import { User as UserUI } from 'ui/common/models/User';
import { UI_MAPPINGS_IDENTIFIERS } from 'ui/UiModuleSymbols';

@injectable()
export class UserDomainToUserUIMapper implements IMapper {
  configureMappings(mapper: Mapper): void {
    mapper.createMap<User, UserUI>(
      {
        destination: UI_MAPPINGS_IDENTIFIERS.USER_UI,
        source: DOMAIN_MAPPING_IDENTIFIERS.USER_DOMAIN,
      },
      User
    );
  }
}

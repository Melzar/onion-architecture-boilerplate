import { Mapper } from '@wufe/mapper';

import { IMapping } from 'core/common/mapper/IMapping';

import { User } from 'core/domain/User/User';
import { DOMAIN_MAPPING_IDENTIFIERS } from 'core/CoreModuleSymbols';

import { User as UserUI } from 'ui/common/models/User';
import { UI_MAPPINGS_IDENTIFIERS } from 'ui/UiModuleSymbols';

export const UserDomainToUserUI = (): IMapping => ({
  configureMapping(mapper: Mapper): void {
    mapper.createMap<User, UserUI>(
      {
        destination: UI_MAPPINGS_IDENTIFIERS.USER_UI,
        source: DOMAIN_MAPPING_IDENTIFIERS.USER_DOMAIN,
      },
      User
    );
  },
});

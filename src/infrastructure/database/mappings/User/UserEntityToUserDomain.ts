import { Mapper } from '@wufe/mapper';

import { IMapping } from 'core/common/mapper/IMapping';

import { DOMAIN_MAPPING_IDENTIFIERS } from 'core/CoreModuleSymbols';

import { User } from 'core/domain/User/User';
import { User as UserEntity } from 'infrastructure/database/entities/User';

import { DATABASE_MAPPING_IDENTIFIERS } from 'infrastructure/InfrastructureModuleSymbols';

export const UserEntityToUserDomain = (): IMapping => ({
  configureMapping(mapper: Mapper): void {
    mapper
      .createMap<UserEntity, User>(
        {
          destination: DOMAIN_MAPPING_IDENTIFIERS.USER_DOMAIN,
          source: DATABASE_MAPPING_IDENTIFIERS.USER_ENTITY,
        },
        User
      )
      .forMember('role', opt => opt.mapFrom(src => src.role.name));
  },
});

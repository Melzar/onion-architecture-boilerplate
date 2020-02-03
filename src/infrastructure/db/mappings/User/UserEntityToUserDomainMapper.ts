import { injectable } from 'inversify';

import { Mapper } from '@wufe/mapper';

import { IMapper } from 'core/common/mapper/IMapper';

import { DOMAIN_MAPPING_IDENTIFIERS } from 'core/CoreModuleSymbols';

import { User } from 'core/domain/User/User';
import { User as UserEntity } from 'infrastructure/db/entities/User';

import { DATABASE_MAPPING_IDENTIFIERS } from 'infrastructure/InfrastructureModuleSymbols';

@injectable()
export class UserEntityToUserDomainMapper implements IMapper {
  public configureMappings(mapper: Mapper): void {
    mapper
      .createMap<UserEntity, User>(
        {
          destination: DOMAIN_MAPPING_IDENTIFIERS.USER_DOMAIN,
          source: DATABASE_MAPPING_IDENTIFIERS.USER_ENTITY,
        },
        User
      )
      .forMember('role', opt => opt.mapFrom(src => src.role.name));
  }
}

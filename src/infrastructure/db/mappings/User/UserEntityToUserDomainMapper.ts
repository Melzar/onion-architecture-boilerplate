import { injectable } from 'inversify';

import { Mapper } from '@wufe/mapper';

import { User } from 'core/domain/User';
import { User as UserEntity } from 'infrastructure/db/entities/User';

import { IMapper } from 'infrastructure/common/mapper/IMapper';

import { DATABASE_MAPPING_IDENTIFIERS } from 'infrastructure/InfrastructureModuleSymbols';

@injectable()
export class UserEntityToUserDomainMapper implements IMapper {
  public configureMappings(mapper: Mapper): void {
    mapper
      .createMap<UserEntity, User>(
        {
          source: DATABASE_MAPPING_IDENTIFIERS.USER_ENTITY,
          destination: DATABASE_MAPPING_IDENTIFIERS.USER_DOMAIN,
        },
        User
      )
      .forMember('role', opt => opt.mapFrom(src => src.role.name));
  }
}

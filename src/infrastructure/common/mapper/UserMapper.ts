import { BaseMapper } from 'infrastructure/common/mapper/BaseMapper';
import { IMapper } from 'infrastructure/common/mapper/IMapper';
import { User as UserEntity } from 'infrastructure/db/entities/User';
import { User } from 'core/domain/User';

import { injectable } from 'inversify';

@injectable()
export class UserMapper extends BaseMapper implements IMapper {
  public configureMappings(): void {
    this.mapper.createMap<UserEntity, User>(UserEntity);
  }
}

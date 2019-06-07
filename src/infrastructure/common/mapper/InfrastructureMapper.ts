import { Mapper } from '@wufe/mapper';
import { BaseMapper } from 'infrastructure/common/mapper/BaseMapper';
import { User as UserEntity } from 'infrastructure/db/entities/User';
import { User } from 'core/domain/User';

export class InfrastructureMapper extends BaseMapper {
  constructor() {
    super(new Mapper()); // TODO CONSIDER PASSING IT VIA CONSTRUCTOR PARAMETER OR SOMETHING AND CONFIGURE IT
  }

  initialize(): void {
    this.configureMappings();
    this.configureMapper();
  }

  private configureMapper(): void {
    this.mapper.withConfiguration(configuration => configuration
      .shouldIgnoreSourcePropertiesIfNotInDestination(true)
      .shouldAutomaticallyMapArrays(true));
  }

  private configureMappings(): void { // TODO consider having IMapper with this function
    this.mapper.createMap<UserEntity, User>(UserEntity);
  }
}

export const infrastructureMapper = new InfrastructureMapper(); // TODO Provide via DI;

import { inject, injectable } from 'inversify';
import { EntityRepository } from 'typeorm';

import { Repository } from 'infrastructure/database/repository/common/Repository';
import { BaseError } from 'core/common/errors/BaseError';
import { IStateRepository } from 'core/domainServices/State/IStateRepository';
import { GetStateRepositoryRequest } from 'core/domainServices/State/request/GetStateRepositoryRequest';
import { State } from 'core/domain/State/State';
import { DOMAIN_MAPPING_IDENTIFIERS } from 'core/CoreModuleSymbols';
import {
  DATABASE_MAPPING_IDENTIFIERS,
  INFRASTRUCTURE_IDENTIFIERS,
} from 'infrastructure/InfrastructureModuleSymbols';
import { DBMapper } from 'infrastructure/database/mappings/DBMapper';
import { InfrastructureErrors } from 'infrastructure/common/errors/InfrastructureErrors';
import { State as StateEntity } from 'infrastructure/database/entities/State';

@injectable()
@EntityRepository(StateEntity)
export class StateRepository extends Repository<StateEntity>
  implements IStateRepository {
  constructor(
    @inject(INFRASTRUCTURE_IDENTIFIERS.DB_MAPPER)
    private readonly dbMapper: DBMapper
  ) {
    super(StateEntity);
  }

  async getState({ id }: GetStateRepositoryRequest) {
    const state = await this.find(id);

    if (!state)
      throw new BaseError(
        InfrastructureErrors[InfrastructureErrors.STATE_NOT_FOUND]
      );

    return this.dbMapper.mapper.map<StateEntity, State>(
      {
        destination: DOMAIN_MAPPING_IDENTIFIERS.STATE_DOMAIN,
        source: DATABASE_MAPPING_IDENTIFIERS.STATE_ENTITY,
      },
      state
    );
  }

  async getStates() {
    const states = await this.findAll();

    return this.dbMapper.mapper.map<StateEntity[], State[]>(
      {
        destination: DOMAIN_MAPPING_IDENTIFIERS.STATE_DOMAIN,
        source: DATABASE_MAPPING_IDENTIFIERS.STATE_ENTITY,
      },
      states
    );
  }
}

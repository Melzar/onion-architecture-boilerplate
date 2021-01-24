import { injectable } from 'inversify';
import { Mapper } from '@wufe/mapper';

import { IMapper } from 'core/common/mapper/IMapper';
import { State } from 'core/domain/State/State';
import { DOMAIN_MAPPING_IDENTIFIERS } from 'core/CoreModuleSymbols';
import { DATABASE_MAPPING_IDENTIFIERS } from 'infrastructure/InfrastructureModuleSymbols';
import { State as StateEntity } from 'infrastructure/database/entities/State';

@injectable()
export class StateEntityToStateDomainMapper implements IMapper {
  public configureMappings(mapper: Mapper): void {
    mapper.createMap<StateEntity, State>(
      {
        destination: DOMAIN_MAPPING_IDENTIFIERS.STATE_DOMAIN,
        source: DATABASE_MAPPING_IDENTIFIERS.STATE_ENTITY,
      },
      State
    );
  }
}

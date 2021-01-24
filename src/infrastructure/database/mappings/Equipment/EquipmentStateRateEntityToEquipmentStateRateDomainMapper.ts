import { injectable } from 'inversify';

import { Mapper } from '@wufe/mapper';

import { IMapper } from 'core/common/mapper/IMapper';
import { EquipmentStateRate } from 'core/domain/Equipment/EquipmentStateRate';
import { DOMAIN_MAPPING_IDENTIFIERS } from 'core/CoreModuleSymbols';
import { DATABASE_MAPPING_IDENTIFIERS } from 'infrastructure/InfrastructureModuleSymbols';
import { Equipment as EquipmentEntity } from 'infrastructure/database/entities/Equipment';

@injectable()
export class EquipmentStateRateEntityToEquipmentStateRateDomainMapper
  implements IMapper {
  public configureMappings(mapper: Mapper): void {
    mapper.createMap<EquipmentEntity, EquipmentStateRate>(
      {
        destination: DOMAIN_MAPPING_IDENTIFIERS.EQUIPMENT_STATE_RATE_DOMAIN,
        source: DATABASE_MAPPING_IDENTIFIERS.EQUIPMENT_STATE_RATE_ENTITY,
      },
      EquipmentStateRate
    );
  }
}

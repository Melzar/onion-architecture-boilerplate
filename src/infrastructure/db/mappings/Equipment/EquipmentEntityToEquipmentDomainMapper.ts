import { injectable } from 'inversify';

import { Mapper } from '@wufe/mapper';

import { IMapper } from 'core/common/mapper/IMapper';
import { DOMAIN_MAPPING_IDENTIFIERS } from 'core/CoreModuleSymbols';
import { Equipment } from 'core/domain/Equipment/Equipment';

import { DATABASE_MAPPING_IDENTIFIERS } from 'infrastructure/InfrastructureModuleSymbols';
import { Equipment as EquipmentEntity } from 'infrastructure/db/entities/Equipment';

@injectable()
export class EquipmentEntityToEquipmentDomainMapper implements IMapper {
  public configureMappings(mapper: Mapper): void {
    mapper.createMap<EquipmentEntity, Equipment>(
      {
        destination: DOMAIN_MAPPING_IDENTIFIERS.EQUIPMENT_DOMAIN,
        source: DATABASE_MAPPING_IDENTIFIERS.EQUIPMENT_ENTITY,
      },
      Equipment
    );
  }
}

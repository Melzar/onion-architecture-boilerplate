import { Mapper } from '@wufe/mapper';

import { IMapping } from 'core/common/mapper/IMapping';
import { DOMAIN_MAPPING_IDENTIFIERS } from 'core/CoreModuleSymbols';
import { Equipment } from 'core/domain/Equipment/Equipment';

import { DATABASE_MAPPING_IDENTIFIERS } from 'infrastructure/InfrastructureModuleSymbols';
import { Equipment as EquipmentEntity } from 'infrastructure/database/entities/Equipment';

export const EquipmentEntityToEquipmentDomain = (): IMapping => ({
  configureMapping(mapper: Mapper): void {
    mapper.createMap<EquipmentEntity, Equipment>(
      {
        destination: DOMAIN_MAPPING_IDENTIFIERS.EQUIPMENT_DOMAIN,
        source: DATABASE_MAPPING_IDENTIFIERS.EQUIPMENT_ENTITY,
      },
      Equipment
    );
  },
});

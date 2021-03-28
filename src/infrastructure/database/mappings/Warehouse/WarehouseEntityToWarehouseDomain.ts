import { Mapper } from '@wufe/mapper';

import { IMapping } from 'core/common/mapper/IMapping';
import { DOMAIN_MAPPING_IDENTIFIERS } from 'core/CoreModuleSymbols';
import { DATABASE_MAPPING_IDENTIFIERS } from 'infrastructure/InfrastructureModuleSymbols';
import { Warehouse as WarehouseEntity } from 'infrastructure/database/entities/Warehouse';
import { Warehouse } from 'core/domain/Warehouse/Warehouse';

export const WarehouseEntityToWarehouseDomain = (): IMapping => ({
  configureMapping(mapper: Mapper): void {
    mapper.createMap<WarehouseEntity, Warehouse>(
      {
        source: DATABASE_MAPPING_IDENTIFIERS.WAREHOUSE_ENTITY,
        destination: DOMAIN_MAPPING_IDENTIFIERS.WAREHOUSE_DOMAIN,
      },
      Warehouse
    );
  },
});

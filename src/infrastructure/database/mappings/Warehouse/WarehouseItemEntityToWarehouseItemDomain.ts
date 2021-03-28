import { Mapper } from '@wufe/mapper';

import { IMapping } from 'core/common/mapper/IMapping';
import { DOMAIN_MAPPING_IDENTIFIERS } from 'core/CoreModuleSymbols';
import { DATABASE_MAPPING_IDENTIFIERS } from 'infrastructure/InfrastructureModuleSymbols';
import { WarehouseItem as WarehouseItemEntity } from 'infrastructure/database/entities/WarehouseItem';
import { WarehouseItem } from 'core/domain/Warehouse/WarehouseItem';

export const WarehouseItemEntityToWarehouseItemDomain = (): IMapping => ({
  configureMapping(mapper: Mapper): void {
    mapper.createMap<WarehouseItemEntity, WarehouseItem>(
      {
        source: DATABASE_MAPPING_IDENTIFIERS.WAREHOUSE_ITEM_ENTITY,
        destination: DOMAIN_MAPPING_IDENTIFIERS.WAREHOUSE_ITEM_DOMAIN,
      },
      WarehouseItem
    );
  },
});

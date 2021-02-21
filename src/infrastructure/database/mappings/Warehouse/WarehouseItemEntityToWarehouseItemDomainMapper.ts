import { injectable } from 'inversify';

import { Mapper } from '@wufe/mapper';

import { IMapper } from 'core/common/mapper/IMapper';
import { DOMAIN_MAPPING_IDENTIFIERS } from 'core/CoreModuleSymbols';
import { DATABASE_MAPPING_IDENTIFIERS } from 'infrastructure/InfrastructureModuleSymbols';
import { WarehouseItem as WarehouseItemEntity } from 'infrastructure/database/entities/WarehouseItem';
import { WarehouseItem } from 'core/domain/Warehouse/WarehouseItem';

@injectable()
export class WarehouseItemEntityToWarehouseItemDomainMapper implements IMapper {
  public configureMappings(mapper: Mapper): void {
    mapper.createMap<WarehouseItemEntity, WarehouseItem>(
      {
        source: DATABASE_MAPPING_IDENTIFIERS.WAREHOUSE_ITEM_ENTITY,
        destination: DOMAIN_MAPPING_IDENTIFIERS.WAREHOUSE_ITEM_DOMAIN,
      },
      WarehouseItem
    );
  }
}

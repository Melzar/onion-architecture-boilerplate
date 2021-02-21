import { Factory, Seeder, times } from 'typeorm-seeding';

import { Warehouse } from 'infrastructure/database/entities/Warehouse';

export class WarehouseSeed implements Seeder {
  async run(factory: Factory): Promise<void> {
    await this.prepareWarehouseSeeds(factory);
  }

  private async prepareWarehouseSeeds(factory: Factory): Promise<void> {
    await times(5, async () => {
      await factory(Warehouse)().create();
    });
  }
}

import { Factory, Seeder, times } from 'typeorm-seeding';

import { State } from 'infrastructure/database/entities/State';

export class StateSeed implements Seeder {
  async run(factory: Factory): Promise<void> {
    await this.prepareStateSeeds(factory);
  }

  private async prepareStateSeeds(factory: Factory): Promise<void> {
    await times(5, async () => {
      await factory(State)().create();
    });
  }
}

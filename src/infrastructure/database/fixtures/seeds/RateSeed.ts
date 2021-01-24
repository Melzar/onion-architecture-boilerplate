import { Factory, Seeder, times } from 'typeorm-seeding';

import { Rate } from 'infrastructure/database/entities/Rate';

export class RateSeed implements Seeder {
  async run(factory: Factory): Promise<any> {
    await this.prepareRateSeeds(factory);
  }

  private async prepareRateSeeds(factory: Factory): Promise<void> {
    await times(5, async () => {
      await factory(Rate)().create();
    });
  }
}

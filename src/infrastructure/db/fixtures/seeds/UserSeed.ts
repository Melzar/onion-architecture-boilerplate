import { Factory, Seeder } from 'typeorm-seeding';

import { User } from 'infrastructure/db/entities/User';

export class UserSeed implements Seeder {
  async run(factory: Factory): Promise<any> {
    await factory(User)().seed({
      email: 'onion_user_1@example.com',
    });
  }
}

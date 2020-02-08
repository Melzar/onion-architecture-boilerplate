import { Factory, Seeder } from 'typeorm-seeding';

import { Role } from 'infrastructure/db/entities/Role';
import { USER_ROLE } from 'infrastructure/db/enum/UserRole';
import { User } from 'infrastructure/db/entities/User';

export class UserSeed implements Seeder {
  async run(factory: Factory): Promise<any> {
    await this.prepareUserSeedToDelete(factory);
  }

  private async prepareUserSeedToDelete(factory: Factory): Promise<void> {
    const memberRole = await factory(Role)().seed({
      name: USER_ROLE.MEMBER,
    });

    await factory(User)().seed({
      email: 'onion_member_test_delete@example.com',
      role: memberRole,
    });
  }
}

import { Factory, Seeder, times } from 'typeorm-seeding';

import { Role } from 'infrastructure/database/entities/Role';
import { USER_ROLE } from 'infrastructure/database/enum/UserRole';
import { User } from 'infrastructure/database/entities/User';
import { Equipment } from 'infrastructure/database/entities/Equipment';

export class UserSeed implements Seeder {
  async run(factory: Factory): Promise<any> {
    await this.prepareUserSeedToDelete(factory);
  }

  private async prepareUserSeedToDelete(factory: Factory): Promise<void> {
    const memberRole = await factory(Role)().create({
      name: USER_ROLE.MEMBER,
    });

    const user = await factory(User)().create({
      email: 'onion_member_test_delete@example.com',
      role: memberRole,
    });

    await times(5, async () => {
      await factory(Equipment)().create({
        user,
      });
    });
  }
}

import { Factory, Seeder } from 'typeorm-seeding';

import { Role } from 'infrastructure/db/entities/Role';
import { USER_ROLE } from 'infrastructure/db/enum/UserRole';
import { User } from 'infrastructure/db/entities/User';

export class AuthenticationSeed implements Seeder {
  async run(factory: Factory): Promise<any> {
    await this.prepareAuthenticationMemberUserSeed(factory);
    await this.prepareAuthenticationAdminUserSeed(factory);
  }

  private async prepareAuthenticationMemberUserSeed(
    factory: Factory
  ): Promise<void> {
    const memberRole = await factory(Role)().seed({
      name: USER_ROLE.MEMBER,
    });

    await factory(User)().seed({
      email: 'onion_member_test@example.com',
      role: memberRole,
    });
  }

  private async prepareAuthenticationAdminUserSeed(
    factory: Factory
  ): Promise<void> {
    const adminRole = await factory(Role)().seed({
      name: USER_ROLE.ADMIN,
    });

    await factory(User)().seed({
      email: 'onion_admin_test@example.com',
      role: adminRole,
    });
  }
}

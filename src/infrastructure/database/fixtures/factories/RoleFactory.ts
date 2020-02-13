import { define } from 'typeorm-seeding';
import * as Faker from 'faker';

import { Role } from 'infrastructure/database/entities/Role';
import { USER_ROLE } from 'infrastructure/database/enum/UserRole';

define(Role, (faker: typeof Faker) => {
  const role = new Role();

  role.name = faker.random.arrayElement([USER_ROLE.ADMIN, USER_ROLE.MEMBER]);

  return role;
});

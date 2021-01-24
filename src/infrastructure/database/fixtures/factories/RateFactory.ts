import { define } from 'typeorm-seeding';

import Faker from 'faker';

import { Rate } from 'infrastructure/database/entities/Rate';

define(Rate, (faker: typeof Faker) => {
  const state = new Rate();

  state.value = faker.random.number({ min: 0, max: 10, precision: 5 });

  return state;
});

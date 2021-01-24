import { define } from 'typeorm-seeding';

import Faker from 'faker';

import { State } from 'infrastructure/database/entities/State';

define(State, (faker: typeof Faker) => {
  const state = new State();

  state.name = faker.address.state();

  return state;
});

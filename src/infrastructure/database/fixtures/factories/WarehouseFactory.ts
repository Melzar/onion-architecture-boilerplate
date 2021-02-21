import { define } from 'typeorm-seeding';
import Faker from 'faker';

import { Warehouse } from 'infrastructure/database/entities/Warehouse';

const RANDOM_NUMBER_SIZE = 100;

define(Warehouse, (faker: typeof Faker) => {
  const counter = faker.random.number(RANDOM_NUMBER_SIZE);
  const warehouse = new Warehouse();

  warehouse.name = `Joe & Son Storage Facility ${counter}`;

  return warehouse;
});

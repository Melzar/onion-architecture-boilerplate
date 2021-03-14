import { define } from 'typeorm-seeding';
import * as Faker from 'faker';

import { Equipment } from 'infrastructure/database/entities/Equipment';

const RANDOM_NUMBER_SIZE = 100;
const RANDOM_DIMENSIONS_SIZE = 1000;

define(Equipment, (faker: typeof Faker) => {
  const counter = faker.random.number(RANDOM_NUMBER_SIZE);
  const equipment = new Equipment();

  equipment.name = `onion_equipment_${counter}`;
  equipment.width = faker.random.number(RANDOM_DIMENSIONS_SIZE);
  equipment.height = faker.random.number(RANDOM_DIMENSIONS_SIZE);
  equipment.depth = faker.random.number(RANDOM_DIMENSIONS_SIZE);

  return equipment;
});

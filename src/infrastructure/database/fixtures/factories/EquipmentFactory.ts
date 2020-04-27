import { define } from 'typeorm-seeding';
import * as Faker from 'faker';

import { Equipment } from 'infrastructure/database/entities/Equipment';

const RANDOM_NUMBER_SIZE = 100;

define(Equipment, (faker: typeof Faker) => {
  const counter = faker.random.number(RANDOM_NUMBER_SIZE);
  const equipment = new Equipment();

  equipment.name = `onion_equipment_${counter}`;

  return equipment;
});

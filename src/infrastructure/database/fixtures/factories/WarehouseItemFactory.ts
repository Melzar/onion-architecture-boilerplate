import { define } from 'typeorm-seeding';
import Faker from 'faker';

import { WarehouseItem } from 'infrastructure/database/entities/WarehouseItem';

const RANDOM_NUMBER_SIZE = 100;

define(WarehouseItem, (faker: typeof Faker) => {
  const counter = faker.random.number(RANDOM_NUMBER_SIZE);
  const warehouseItem = new WarehouseItem();

  warehouseItem.name = `Secret Case ${counter}`;

  return warehouseItem;
});

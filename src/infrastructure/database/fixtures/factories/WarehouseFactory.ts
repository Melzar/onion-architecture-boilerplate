import { define } from 'typeorm-seeding';
import Faker from 'faker';

import { Warehouse } from 'infrastructure/database/entities/Warehouse';

const RANDOM_NUMBER_SIZE = 100;
const RANDOM_DIMENSIONS_SIZE = 1000000;
const RANDOM_COST = {
  min: 1,
  max: 1000,
  precision: 0.01,
};

define(Warehouse, (faker: typeof Faker) => {
  const counter = faker.random.number(RANDOM_NUMBER_SIZE);
  const warehouse = new Warehouse();

  warehouse.name = `Joe & Son Storage Facility ${counter}`;
  warehouse.capacityWidth = faker.random.number(RANDOM_DIMENSIONS_SIZE);
  warehouse.capacityDepth = faker.random.number(RANDOM_DIMENSIONS_SIZE);
  warehouse.capacityHeight = faker.random.number(RANDOM_DIMENSIONS_SIZE);
  warehouse.capacityWidthLoad = faker.random.number(RANDOM_DIMENSIONS_SIZE);
  warehouse.capacityHeightLoad = faker.random.number(RANDOM_DIMENSIONS_SIZE);
  warehouse.capacityDepthLoad = faker.random.number(RANDOM_DIMENSIONS_SIZE);
  warehouse.widthCost = faker.random.number(RANDOM_COST);
  warehouse.depthCost = faker.random.number(RANDOM_COST);
  warehouse.heightCost = faker.random.number(RANDOM_COST);

  return warehouse;
});

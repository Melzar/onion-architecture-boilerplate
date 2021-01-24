import { define } from 'typeorm-seeding';

import { EquipmentStateRate } from 'infrastructure/database/entities/EquipmentStateRate';

define(EquipmentStateRate, () => {
  return new EquipmentStateRate();
});

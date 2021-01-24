export const INFRASTRUCTURE_IDENTIFIERS = {
  DB_MAPPER: Symbol.for('DBMapper'),
  EQUIPMENT_MAPPER: Symbol.for('EquipmentMapper'),
  EQUIPMENT_STATE_RATE_MAPPER: Symbol.for('EquipmentStateRateMapper'),
  ROLE_MAPPER: Symbol.for('RoleEntityMapper'),
  USER_MAPPER: Symbol.for('UserEntityMapper'),
  RATE_MAPPER: Symbol.for('RateEntityMapper'),
  STATE_MAPPER: Symbol.for('StateEntityMapper'),
};

export const DATABASE_IDENTIFIERS = {
  ORM: Symbol.for('Orm'),
};

export const DATABASE_MAPPING_IDENTIFIERS = {
  EQUIPMENT_ENTITY: Symbol.for('EquipmentEntity'),
  EQUIPMENT_STATE_RATE_ENTITY: Symbol.for('EquipmentStateRate'),
  ROLE_ENTITY: Symbol.for('RoleEntity'),
  USER_ENTITY: Symbol.for('UserEntity'),
  RATE_ENTITY: Symbol.for('StateEntity'),
  STATE_ENTITY: Symbol.for('StateEntity'),
};

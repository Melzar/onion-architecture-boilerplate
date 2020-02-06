export const INFRASTRUCTURE_IDENTIFIERS = {
  DB_MAPPER: Symbol.for('DBMapper'),
  EQUIPMENT_MAPPER: Symbol.for('EquipmentMapper'),
  ROLE_MAPPER: Symbol.for('RoleEntityMapper'),
  USER_MAPPER: Symbol.for('UserEntityMapper'),
};

export const DATABASE_IDENTIFIERS = {
  ORM: Symbol.for('Orm'),
};

export const DATABASE_MAPPING_IDENTIFIERS = {
  EQUIPMENT_ENTITY: Symbol.for('EquipmentEntity'),
  ROLE_ENTITY: Symbol.for('RoleEntity'),
  USER_ENTITY: Symbol.for('UserEntity'),
};

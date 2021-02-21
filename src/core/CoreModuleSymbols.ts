export const DOMAIN_APPLICATION_SERVICE_IDENTIFIERS = {
  AUTHENTICATION_SERVICE: Symbol.for('AuthenticationService'),
  EQUIPMENT_SERVICE: Symbol.for('EquipmentService'),
  USER_SERVICE: Symbol.for('UserService'),
  USER_EQUIPMENT_SERVICE: Symbol.for('UserEquipmentService'),
  RATE_SERVICE: Symbol.for('RateService'),
  STATE_SERVICE: Symbol.for('StateService'),
  WAREHOUSE_SERVICE: Symbol.for('WarehouseService'),
  WAREHOUSE_ITEM_SERVICE: Symbol.for('WarehouseItemService'),
};

export const DOMAIN_REPOSITORY_IDENTIFIERS = {
  EQUIPMENT_REPOSITORY: Symbol.for('EquipmentRepository'),
  ROLE_REPOSITORY: Symbol.for('RoleRepository'),
  USER_REPOSITORY: Symbol.for('UserRepository'),
  RATE_REPOSITORY: Symbol.for('RateRepository'),
  STATE_REPOSITORY: Symbol.for('StateRepository'),
  WAREHOUSE_REPOSITORY: Symbol.for('WarehouseRepository'),
  WAREHOUSE_ITEM_REPOSITORY: Symbol.for('WarehouseItemRepository'),
};

export const DOMAIN_UNIT_OF_WORK_IDENTIFIERS = {
  EQUIPMENT_UNIT_OF_WORK: Symbol.for('EquipmentUnitOfWork'),
  USER_UNIT_OF_WORK: Symbol.for('UserUnitOfWork'),
};

export const DOMAIN_MAPPING_IDENTIFIERS = {
  EQUIPMENT_DOMAIN: Symbol.for('EquipmentDomain'),
  EQUIPMENT_STATE_RATE_DOMAIN: Symbol.for('EquipmentStateRate'),
  ROLE_DOMAIN: Symbol.for('RoleDomain'),
  USER_DOMAIN: Symbol.for('UserDomain'),
  RATE_DOMAIN: Symbol.for('RateDomain'),
  STATE_DOMAIN: Symbol.for('StateDomain'),
  WAREHOUSE_DOMAIN: Symbol.for('WarehouseDomain'),
  WAREHOUSE_ITEM_DOMAIN: Symbol.for('WarehouseItemDomain'),
};

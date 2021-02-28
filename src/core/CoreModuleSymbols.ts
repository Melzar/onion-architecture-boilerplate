export const DOMAIN_APPLICATION_SERVICE_IDENTIFIERS = {
  AUTHENTICATION_SERVICE: Symbol.for('AuthenticationService'),
  EQUIPMENT_SERVICE: Symbol.for('EquipmentService'),
  USER_SERVICE: Symbol.for('UserService'),
  USER_EQUIPMENT_SERVICE: Symbol.for('UserEquipmentService'),
  RATE_SERVICE: Symbol.for('RateService'),
  STATE_SERVICE: Symbol.for('StateService'),
  WAREHOUSE_SERVICE: Symbol.for('WarehouseService'),
  WAREHOUSE_WAREHOUSE_ITEM_SERVICE: Symbol.for('WarehouseWarehouseItemService'),
  WAREHOUSE_STATE_SERVICE: Symbol.for('WarehouseStateService'),
  WAREHOUSE_ITEM_SERVICE: Symbol.for('WarehouseItemService'),
  WAREHOUSE_ITEM_WAREHOUSE_SERVICE: Symbol.for('WarehouseItemWarehouseService'),
  WAREHOUSE_ITEM_EQUIPMENT_SERVICE: Symbol.for('WarehouseItemEquipmentService'),

  PORTAL_WAREHOUSE_SERVICE: Symbol.for('PortalWarehouseService'),
  PORTAL_WAREHOUSE_ITEM_SERVICE: Symbol.for('PortalWarehouseItemService'),
};

export const DOMAIN_REPOSITORY_IDENTIFIERS = {
  EQUIPMENT_REPOSITORY: Symbol.for('EquipmentRepository'),
  ROLE_REPOSITORY: Symbol.for('RoleRepository'),
  USER_REPOSITORY: Symbol.for('UserRepository'),
  RATE_REPOSITORY: Symbol.for('RateRepository'),
  STATE_REPOSITORY: Symbol.for('StateRepository'),
  WAREHOUSE_REPOSITORY: Symbol.for('WarehouseRepository'),
  WAREHOUSE_WAREHOUSE_ITEM_REPOSITORY: Symbol.for(
    'WarehouseWarehouseItemRepository'
  ),
  WAREHOUSE_STATE_REPOSITORY: Symbol.for('WarehouseStateRepository'),
  WAREHOUSE_ITEM_REPOSITORY: Symbol.for('WarehouseItemRepository'),
  WAREHOUSE_ITEM_WAREHOUSE_REPOSITORY: Symbol.for(
    'WarehouseItemWarehouseRepository'
  ),
  WAREHOUSE_ITEM_EQUIPMENT_REPOSITORY: Symbol.for(
    'WarehouseItemEquipmentRepository'
  ),

  PORTAL_WAREHOUSE_REPOSITORY: Symbol.for('PortalWarehouseRepository'),
  PORTAL_WAREHOUSE_ITEM_REPOSITORY: Symbol.for('PortalItemWarehouseRepository'),
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

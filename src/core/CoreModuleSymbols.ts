export const DOMAIN_APPLICATION_SERVICE_IDENTIFIERS = {
  AUTHENTICATION_SERVICE: Symbol.for('AuthenticationService'),
  EQUIPMENT_SERVICE: Symbol.for('EquipmentService'),
  USER_SERVICE: Symbol.for('UserService'),
};

export const DOMAIN_REPOSITORY_IDENTIFIERS = {
  EQUIPMENT_REPOSITORY: Symbol.for('IEquipmentRepository'),
  ROLE_REPOSITORY: Symbol.for('IRoleRepository'),
  USER_REPOSITORY: Symbol.for('IUserRepository'),
};

export const DOMAIN_UNIT_OF_WORK_IDENTIFIERS = {
  EQUIPMENT_UNIT_OF_WORK: Symbol.for('IEquipmentUnitOfWork'),
  USER_UNIT_OF_WORK: Symbol.for('IUserUnitOfWork'),
};

export const DOMAIN_MAPPING_IDENTIFIERS = {
  EQUIPMENT_DOMAIN: Symbol.for('EquipmentDomain'),
  ROLE_DOMAIN: Symbol.for('RoleDomain'),
  USER_DOMAIN: Symbol.for('UserDomain'),
};

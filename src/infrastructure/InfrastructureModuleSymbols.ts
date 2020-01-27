export const INFRASTRUCTURE_SYMBOLS = {
  DB_MAPPER: Symbol.for('DBMapper'),
  USER_MAPPER: Symbol.for('UserMapper'),
};

export const DATABASE_IDENTIFIERS = {
  ORM: Symbol.for('BaseOrm'),
};

export const DATABASE_MAPPING_IDENTIFIERS = {
  USER_ENTITY: Symbol.for('UserEntity'),
  USER_DOMAIN: Symbol.for('UserDomain'),
};

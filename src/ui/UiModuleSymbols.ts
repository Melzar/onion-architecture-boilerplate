export const UI_IDENTIFIERS = {
  UI_MAPPER: Symbol.for('UIMapper'),
  USER_MAPPER: Symbol.for('UserUIMapper'),
};

export const APPLICATION_IDENTIFIERS = {
  JWT_AUTHENTICATION_HANDLER: Symbol.for('JWTAuthenticationHandler'),
  EXPRESS: Symbol.for('Express'),
  EXPRESS_APPLICATION: Symbol.for('ExpressApplication'),
  INVERSIFY_APPLICATION: Symbol.for('InversifyExpressApplication'),
  IS_AUTHENTICATED: Symbol.for('ApplicationAuthProvider'),
  JWT_TOKEN_UTIL: Symbol.for('JWTTokenUtil'),
  LOGGER: Symbol.for('Logger'),
  LOGGER_FORMAT: Symbol.for('WinstonFormat'),
  LOGGER_WINSTON: Symbol.for('WinstonLogger'),
  ROOT_ROUTER: Symbol.for('RootRouter'),
};

export const UI_MAPPINGS_IDENTIFIERS = {
  USER_UI: Symbol.for('UserUI'),
};

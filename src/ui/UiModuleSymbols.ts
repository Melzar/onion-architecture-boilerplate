export const UI_IDENTIFIERS = {
  UI_MAPPER: Symbol.for('UIMapper'),
  USER_MAPPER: Symbol.for('UserUIMapper'),
};

export const UI_APPLICATION_IDENTIFIERS = {
  EXPRESS: Symbol.for('Express'),

  APOLLO_SERVER: Symbol.for('ApolloServer'),
  APOLLO_SERVER_CONFIG: Symbol.for('ApolloServerConfig'),
  APOLLO_CONFIG: Symbol.for('ApolloConfig'),
  APOLLO_CONTEXT: Symbol.for('ApolloContext'),
  APOLLO_REQUEST_DID_START_PLUGIN: Symbol.for('ApolloRequestDidStartPlugin'),

  EXPRESS_APPLICATION: Symbol.for('ExpressApplication'),
  APOLLO_APPLICATION: Symbol.for('ApolloApplication'),
  INVERSIFY_APPLICATION: Symbol.for('InversifyExpressApplication'),

  IS_AUTHENTICATED: Symbol.for('ApplicationAuthProvider'),
  GRAPHQL_JWT_AUTHENTICATION_HANDLER: Symbol.for(
    'GraphQLJwtAuthenticationHandler'
  ),
  JWT_AUTHENTICATION_HANDLER: Symbol.for('JWTAuthenticationHandler'),
  JWT_TOKEN_UTIL: Symbol.for('JWTTokenUtil'),
  LOGGER: Symbol.for('Logger'),
  LOGGER_FORMAT: Symbol.for('WinstonFormat'),
  LOGGER_WINSTON: Symbol.for('WinstonLogger'),
  ROOT_ROUTER: Symbol.for('RootRouter'),

  SCHEMA_ROOT_RESOLVER: Symbol.for('SchemaRootResolver'),
  SCHEMA_QUERIES: Symbol.for('SchemaQueries'),
  SCHEMA_MUTATIONS: Symbol.for('SchemaMutations'),
  SCHEMA_SUBQUERIES: Symbol.for('SchemaSubqueries'),
};

export const UI_SCHEMA_IDENTIFIERS = {
  AUTHENTICATION_MUTATIONS: Symbol.for('AuthenticationMutations'),

  USER_QUERIES: Symbol.for('UserQueries'),
  USER_MUTATIONS: Symbol.for('UserMutations'),
  USER_SUBQUERIES: Symbol.for('UserSubqueries'),

  EQUIPMENT_QUERIES: Symbol.for('EquipmentQueries'),
  EQUIPMENT_MUTATIONS: Symbol.for('EquipmentMutations'),
  EQUIPMENT_SUBQUERIES: Symbol.for('EquipmentSubqueries'),

  ROLE_QUERIES: Symbol.for('RoleQueries'),
  ROLE_MUTATIONS: Symbol.for('RoleMutations'),
  ROLE_SUBQUERIES: Symbol.for('RoleSubqueries'),
};

export const UI_MAPPINGS_IDENTIFIERS = {
  USER_UI: Symbol.for('UserUI'),
};

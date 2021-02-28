export const UI_IDENTIFIERS = {
  UI_MAPPER: Symbol.for('UIMapper'),
  USER_MAPPER: Symbol.for('UserUIMapper'),
};

export const UI_APPLICATION_IDENTIFIERS = {
  EXPRESS: Symbol.for('Express'),
  EXPRESS_ROUTER: Symbol.for('ExpressRouter'),

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

// TODO CANDIDATE TO SPLIT
export const UI_SCHEMA_IDENTIFIERS = {
  AUTHENTICATION_MUTATIONS: Symbol.for('AuthenticationMutations'),

  USER_QUERIES: Symbol.for('UserQueries'),

  ADMINISTRATION_USER_QUERIES: Symbol.for('AdministrationUserQueries'),
  ADMINISTRATION_USER_MUTATIONS: Symbol.for('AdministrationUserMutations'),
  ADMINISTRATION_USER_SUBQUERIES: Symbol.for('AdministrationUserSubQueries'),

  ADMINISTRATION_WAREHOUSE_QUERIES: Symbol.for(
    'AdministrationWarehouseQueries'
  ),
  ADMINISTRATION_WAREHOUSE_MUTATIONS: Symbol.for(
    'AdministrationWarehouseMutations'
  ),
  ADMINISTRATION_WAREHOUSE_SUBQUERIES: Symbol.for(
    'AdministrationWarehouseSubQueries'
  ),

  ADMINISTRATION_WAREHOUSE_ITEM_QUERIES: Symbol.for(
    'AdministrationWarehouseItemQueries'
  ),
  ADMINISTRATION_WAREHOUSE_ITEM_MUTATIONS: Symbol.for(
    'AdministrationWarehouseItemMutations'
  ),
  ADMINISTRATION_WAREHOUSE_ITEM_SUBQUERIES: Symbol.for(
    'AdministrationWarehouseItemSubQueries'
  ),

  PORTAL_EQUIPMENT_QUERIES: Symbol.for('PortalEquipmentQueries'),

  EQUIPMENT_QUERIES: Symbol.for('EquipmentQueries'),
  EQUIPMENT_MUTATIONS: Symbol.for('EquipmentMutations'),
  EQUIPMENT_SUBQUERIES: Symbol.for('EquipmentSubQueries'),

  RATE_QUERIES: Symbol.for('RateQueries'),

  STATE_QUERIES: Symbol.for('StateQueries'),

  ADMINISTRATION_QUERIES: Symbol.for('AdministrationQueries'),
  ADMINISTRATION_MUTATIONS: Symbol.for('AdministrationMutations'),
  ADMINISTRATION_SUBQUERIES: Symbol.for('AdministrationSubQueries'),

  PORTAL_QUERIES: Symbol.for('PortalQueries'),
  PORTAL_MUTATIONS: Symbol.for('PortalMutations'),
  PORTAL_SUBQUERIES: Symbol.for('PortalSubQueries'),

  PORTAL_WAREHOUSE_QUERIES: Symbol.for('PortalWarehouseQueries'),
  PORTAL_WAREHOUSE_ITEM_MUTATIONS: Symbol.for('PortalWarehouseItemMutations'),

  SHARED_QUERIES: Symbol.for('CommonQueries'),
  SHARED_MUTATIONS: Symbol.for('CommonMutations'),
  SHARED_SUBQUERIES: Symbol.for('CommonSubQueries'),
};

export const UI_MAPPINGS_IDENTIFIERS = {
  USER_UI: Symbol.for('UserUI'),
};

import { inject, injectable } from 'inversify';

import { IResolverObject } from 'apollo-server-express';

import { IResolver } from 'ui/common/config/application/apollo/common/IResolver';
import { UI_SCHEMA_IDENTIFIERS } from 'ui/UiModuleSymbols';

@injectable()
export class AdministrationSubQuery implements IResolver<IResolverObject> {
  readonly resolvers: IResolverObject;

  constructor(
    @inject(UI_SCHEMA_IDENTIFIERS.ADMINISTRATION_USER_SUBQUERIES)
    public readonly userSubQueries: IResolver,
    @inject(UI_SCHEMA_IDENTIFIERS.EQUIPMENT_SUBQUERIES)
    public readonly equipmentSubQueries: IResolver,
    @inject(UI_SCHEMA_IDENTIFIERS.ADMINISTRATION_WAREHOUSE_SUBQUERIES)
    public readonly warehouseSubQueries: IResolver
  ) {
    this.resolvers = {
      ...this.userSubQueries.resolvers,
      ...this.equipmentSubQueries.resolvers,
      ...this.warehouseSubQueries.resolvers,
    };
  }
}

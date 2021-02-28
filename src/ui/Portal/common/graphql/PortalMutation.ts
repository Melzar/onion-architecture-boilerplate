import { inject, injectable } from 'inversify';

import { IResolverObject } from 'apollo-server-express';

import { IResolver } from 'ui/common/config/application/apollo/common/IResolver';
import { UI_SCHEMA_IDENTIFIERS } from 'ui/UiModuleSymbols';

@injectable()
export class PortalMutation implements IResolver<IResolverObject> {
  readonly resolvers: IResolverObject;

  constructor(
    @inject(UI_SCHEMA_IDENTIFIERS.PORTAL_WAREHOUSE_ITEM_MUTATIONS)
    public readonly warehouseItemMutations: IResolver
  ) {
    this.resolvers = {
      ...warehouseItemMutations.resolvers,
    };
  }
}

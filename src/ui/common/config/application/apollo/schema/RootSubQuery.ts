import { inject, injectable } from 'inversify';

import { IResolvers } from 'apollo-server-express';

import { IResolver } from 'ui/common/config/application/apollo/common/IResolver';
import { UI_SCHEMA_IDENTIFIERS } from 'ui/UiModuleSymbols';

@injectable()
export class RootSubQuery implements IResolver<IResolvers> {
  readonly resolvers: IResolvers;

  constructor(
    @inject(UI_SCHEMA_IDENTIFIERS.USER_SUBQUERIES)
    public readonly userSubqueries: IResolver,
    @inject(UI_SCHEMA_IDENTIFIERS.EQUIPMENT_SUBQUERIES)
    public readonly equipmentSubqueries: IResolver
  ) {
    this.resolvers = {
      ...this.userSubqueries.resolvers,
      ...this.equipmentSubqueries.resolvers,
    };
  }
}

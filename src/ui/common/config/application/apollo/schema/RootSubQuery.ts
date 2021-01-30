import { inject, injectable } from 'inversify';

import { IResolvers } from 'apollo-server-express';

import { IResolver } from 'ui/common/config/application/apollo/common/IResolver';
import { UI_SCHEMA_IDENTIFIERS } from 'ui/UiModuleSymbols';

@injectable()
export class RootSubQuery implements IResolver<IResolvers> {
  readonly resolvers: IResolvers;

  constructor(
    @inject(UI_SCHEMA_IDENTIFIERS.ADMINISTRATION_SUBQUERIES)
    public readonly administrationSubQueries: IResolver,
    @inject(UI_SCHEMA_IDENTIFIERS.PORTAL_SUBQUERIES)
    public readonly portalSubQueries: IResolver,
    @inject(UI_SCHEMA_IDENTIFIERS.SHARED_SUBQUERIES)
    public readonly sharedSubQueries: IResolver
  ) {
    this.resolvers = {
      ...this.administrationSubQueries.resolvers,
      ...this.portalSubQueries.resolvers,
      ...this.sharedSubQueries.resolvers,
    };
  }
}

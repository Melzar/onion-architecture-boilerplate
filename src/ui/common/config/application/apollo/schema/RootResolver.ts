import { inject, injectable } from 'inversify';

import { IResolvers } from 'apollo-server-express';

import { IResolver } from 'ui/common/config/application/apollo/common/IResolver';
import { UI_APPLICATION_IDENTIFIERS } from 'ui/UiModuleSymbols';

@injectable()
export class RootResolver implements IResolver<IResolvers> {
  readonly resolvers: IResolvers;

  constructor(
    @inject(UI_APPLICATION_IDENTIFIERS.SCHEMA_QUERIES)
    public readonly queries: IResolver,
    @inject(UI_APPLICATION_IDENTIFIERS.SCHEMA_MUTATIONS)
    public readonly mutations: IResolver,
    @inject(UI_APPLICATION_IDENTIFIERS.SCHEMA_SUBQUERIES)
    public readonly subqueries: IResolver
  ) {
    this.resolvers = {
      ...this.subqueries.resolvers,
      Query: {
        ...this.queries.resolvers,
      },
      Mutation: {
        ...this.mutations.resolvers,
      },
      Node: {
        __resolveType: () => null,
      },
    };
  }
}

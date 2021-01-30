import { inject, injectable } from 'inversify';

import { IResolvers } from 'apollo-server-express';

import { IResolver } from 'ui/common/config/application/apollo/common/IResolver';
import { UI_SCHEMA_IDENTIFIERS } from 'ui/UiModuleSymbols';

@injectable()
export class RootQuery implements IResolver<IResolvers> {
  readonly resolvers: IResolvers;

  constructor(
    @inject(UI_SCHEMA_IDENTIFIERS.ADMINISTRATION_QUERIES)
    public readonly administrationQueries: IResolver,
    @inject(UI_SCHEMA_IDENTIFIERS.PORTAL_QUERIES)
    public readonly portalQueries: IResolver,
    @inject(UI_SCHEMA_IDENTIFIERS.SHARED_QUERIES)
    public readonly sharedQueries: IResolver
  ) {
    this.resolvers = {
      ...this.administrationQueries.resolvers,
      ...this.portalQueries.resolvers,
      ...this.sharedQueries.resolvers,
    };
  }
}

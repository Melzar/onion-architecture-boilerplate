import { inject, injectable } from 'inversify';

import { IResolvers } from 'apollo-server-express';

import { IResolver } from 'ui/common/config/application/apollo/common/IResolver';
import { UI_SCHEMA_IDENTIFIERS } from 'ui/UiModuleSymbols';

@injectable()
export class RootMutation implements IResolver<IResolvers> {
  readonly resolvers: IResolvers;

  constructor(
    @inject(UI_SCHEMA_IDENTIFIERS.ADMINISTRATION_MUTATIONS)
    public readonly administrationMutations: IResolver,
    @inject(UI_SCHEMA_IDENTIFIERS.PORTAL_MUTATIONS)
    public readonly portalMutations: IResolver,
    @inject(UI_SCHEMA_IDENTIFIERS.SHARED_MUTATIONS)
    public readonly sharedMutations: IResolver
  ) {
    this.resolvers = {
      ...this.administrationMutations.resolvers,
      ...this.portalMutations.resolvers,
      ...this.sharedMutations.resolvers,
    };
  }
}

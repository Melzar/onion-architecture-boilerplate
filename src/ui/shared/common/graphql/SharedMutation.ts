import { inject, injectable } from 'inversify';

import { IResolverObject } from 'apollo-server-express';

import { IResolver } from 'ui/common/config/application/apollo/common/IResolver';

import { UI_SCHEMA_IDENTIFIERS } from 'ui/UiModuleSymbols';

@injectable()
export class SharedMutation implements IResolver<IResolverObject> {
  readonly resolvers: IResolverObject;

  constructor(
    @inject(UI_SCHEMA_IDENTIFIERS.AUTHENTICATION_MUTATIONS)
    public readonly authenticationMutations: IResolver
  ) {
    this.resolvers = {
      ...this.authenticationMutations.resolvers,
    };
  }
}

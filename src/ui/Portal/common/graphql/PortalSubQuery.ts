import { injectable } from 'inversify';

import { IResolverObject } from 'apollo-server-express';

import { IResolver } from 'ui/common/config/application/apollo/common/IResolver';

@injectable()
export class PortalSubQuery implements IResolver<IResolverObject> {
  readonly resolvers: IResolverObject;

  constructor() {
    this.resolvers = {};
  }
}

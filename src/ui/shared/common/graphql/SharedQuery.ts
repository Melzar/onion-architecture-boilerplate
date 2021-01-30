import { injectable } from 'inversify';

import { IResolverObject } from 'apollo-server-express';

import { IResolver } from 'ui/common/config/application/apollo/common/IResolver';

@injectable()
export class SharedQuery implements IResolver<IResolverObject> {
  readonly resolvers: IResolverObject;

  constructor() {
    this.resolvers = {};
  }
}

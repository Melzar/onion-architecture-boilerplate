import { IResolverObject } from 'apollo-server-express';

import { injectable } from 'inversify';

import { IResolver } from 'ui/common/config/application/apollo/common/IResolver';

@injectable()
export class EquipmentQuery implements IResolver<IResolverObject> {
  readonly resolvers: IResolverObject;

  constructor() {
    this.resolvers = {};
  }
}

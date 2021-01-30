import { inject, injectable } from 'inversify';

import { IResolverObject } from 'apollo-server-express';

import { IResolver } from 'ui/common/config/application/apollo/common/IResolver';

import { UI_SCHEMA_IDENTIFIERS } from 'ui/UiModuleSymbols';

@injectable()
export class AdministrationMutation implements IResolver<IResolverObject> {
  readonly resolvers: IResolverObject;

  constructor(
    @inject(UI_SCHEMA_IDENTIFIERS.ADMINISTRATION_USER_MUTATIONS)
    public readonly userMutations: IResolver,
    @inject(UI_SCHEMA_IDENTIFIERS.EQUIPMENT_MUTATIONS)
    public readonly equipmentMutations: IResolver
  ) {
    this.resolvers = {
      ...this.userMutations.resolvers,
      ...this.equipmentMutations.resolvers,
    };
  }
}

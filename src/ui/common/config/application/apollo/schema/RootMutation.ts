import { inject, injectable } from 'inversify';

import { IResolvers } from 'apollo-server-express';

import { IResolver } from 'ui/common/config/application/apollo/common/IResolver';
import { UI_SCHEMA_IDENTIFIERS } from 'ui/UiModuleSymbols';

@injectable()
export class RootMutation implements IResolver<IResolvers> {
  readonly resolvers: IResolvers;

  constructor(
    @inject(UI_SCHEMA_IDENTIFIERS.AUTHENTICATION_MUTATIONS)
    public readonly authenticationMutations: IResolver,
    @inject(UI_SCHEMA_IDENTIFIERS.USER_MUTATIONS)
    public readonly userMutations: IResolver,
    @inject(UI_SCHEMA_IDENTIFIERS.EQUIPMENT_MUTATIONS)
    public readonly equipmentMutations: IResolver
  ) {
    this.resolvers = {
      ...this.authenticationMutations.resolvers,
      ...this.userMutations.resolvers,
      ...this.equipmentMutations.resolvers,
    };
  }
}

import { inject, injectable } from 'inversify';

import { IResolverObject } from 'apollo-server-express';

import { IResolver } from 'ui/common/config/application/apollo/common/IResolver';
import { UI_SCHEMA_IDENTIFIERS } from 'ui/UiModuleSymbols';

@injectable()
export class AdministrationQuery implements IResolver<IResolverObject> {
  readonly resolvers: IResolverObject;

  constructor(
    @inject(UI_SCHEMA_IDENTIFIERS.ADMINISTRATION_USER_QUERIES)
    public readonly userQueries: IResolver,
    @inject(UI_SCHEMA_IDENTIFIERS.EQUIPMENT_QUERIES)
    public readonly equipmentQueries: IResolver,
    @inject(UI_SCHEMA_IDENTIFIERS.STATE_QUERIES)
    public readonly stateQueries: IResolver,
    @inject(UI_SCHEMA_IDENTIFIERS.RATE_QUERIES)
    public readonly rateQueries: IResolver
  ) {
    this.resolvers = {
      ...this.userQueries.resolvers,
      ...this.equipmentQueries.resolvers,
      ...this.rateQueries.resolvers,
      ...this.stateQueries.resolvers,
    };
  }
}

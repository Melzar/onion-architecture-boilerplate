import { inject, injectable } from 'inversify';

import { IResolverObject } from 'apollo-server-express';

import { IResolver } from 'ui/common/config/application/apollo/common/IResolver';
import { Context } from 'ui/common/config/application/apollo/types/Context';
import { DOMAIN_APPLICATION_SERVICE_IDENTIFIERS } from 'core/CoreModuleSymbols';
import { IUserEquipmentService } from 'core/applicationServices/User/IUserEquipmentService';
import { FetchUserEquipmentRequest } from 'core/applicationServices/User/requests/FetchUserEquipmentRequest';

@injectable()
export class EquipmentQuery implements IResolver<IResolverObject> {
  readonly resolvers: IResolverObject;

  constructor(
    @inject(DOMAIN_APPLICATION_SERVICE_IDENTIFIERS.USER_EQUIPMENT_SERVICE)
    private readonly userEquipmentService: IUserEquipmentService
  ) {
    this.resolvers = {
      myEquipment: this.myEquipment,
    };
  }

  private myEquipment = (_root: unknown, _args: unknown, { viewer }: Context) =>
    this.userEquipmentService.fetchUserEquipment(
      new FetchUserEquipmentRequest(viewer!.id)
    );
}

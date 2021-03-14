import { inject, injectable } from 'inversify';

import { IResolverObject } from 'apollo-server-express';

import { IResolver } from 'ui/common/config/application/apollo/common/IResolver';
import { Context } from 'ui/common/config/application/apollo/types/Context';
import { DOMAIN_APPLICATION_SERVICE_IDENTIFIERS } from 'core/CoreModuleSymbols';
import { IUserEquipmentService } from 'core/applicationServices/User/IUserEquipmentService';
import { FetchUserEquipmentRequest } from 'core/applicationServices/User/requests/FetchUserEquipmentRequest';
import { CalculateUserEquipmentCostRequest } from 'core/applicationServices/User/requests/CalculateUserEquipmentCostRequest';
import { CalculateEquipmentCostInput } from 'ui/Portal/Equipment/graphql/inputs/CalculateEquipmentCostInput';

@injectable()
export class EquipmentQuery implements IResolver<IResolverObject> {
  readonly resolvers: IResolverObject;

  constructor(
    @inject(DOMAIN_APPLICATION_SERVICE_IDENTIFIERS.USER_EQUIPMENT_SERVICE)
    private readonly userEquipmentService: IUserEquipmentService
  ) {
    this.resolvers = {
      myEquipment: this.myEquipment,
      calculateEquipmentCost: this.calculateEquipmentCost,
    };
  }

  private myEquipment = (_root: unknown, _args: unknown, { viewer }: Context) =>
    this.userEquipmentService.fetchEquipment(
      new FetchUserEquipmentRequest(viewer!.id)
    );

  private calculateEquipmentCost = (
    _root: unknown,
    {
      input: { equipmentID, warehouseID },
    }: { input: CalculateEquipmentCostInput },
    { viewer }: Context
  ) =>
    this.userEquipmentService.calculateEquipmentCost(
      new CalculateUserEquipmentCostRequest(
        equipmentID,
        warehouseID,
        viewer!.id
      )
    );
}

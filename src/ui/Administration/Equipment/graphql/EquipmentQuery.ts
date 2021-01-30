import { IResolverObject } from 'apollo-server-express';

import { inject, injectable } from 'inversify';

import { IResolver } from 'ui/common/config/application/apollo/common/IResolver';
import { IEquipmentService } from 'core/applicationServices/Equipment/IEquipmentService';
import { DOMAIN_APPLICATION_SERVICE_IDENTIFIERS } from 'core/CoreModuleSymbols';

@injectable()
export class EquipmentQuery implements IResolver<IResolverObject> {
  readonly resolvers: IResolverObject;

  constructor(
    @inject(DOMAIN_APPLICATION_SERVICE_IDENTIFIERS.EQUIPMENT_SERVICE)
    private readonly equipmentService: IEquipmentService
  ) {
    this.resolvers = {
      equipment: this.equipment,
    };
  }

  private equipment = () => this.equipmentService.fetchAllEquipment();
}

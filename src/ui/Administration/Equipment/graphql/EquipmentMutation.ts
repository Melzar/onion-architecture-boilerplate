import { IResolverObject } from 'apollo-server-express';

import { inject, injectable } from 'inversify';

import { IResolver } from 'ui/common/config/application/apollo/common/IResolver';
import { CreateEquipmentInput } from 'ui/Administration/Equipment/graphql/inputs/CreateEquipmentInput';
import { Context } from 'ui/common/config/application/apollo/types/Context';

import { DOMAIN_APPLICATION_SERVICE_IDENTIFIERS } from 'core/CoreModuleSymbols';
import { IEquipmentService } from 'core/applicationServices/Equipment/IEquipmentService';
import { CreateEquipmentRequest } from 'core/applicationServices/Equipment/requests/CreateEquipmentRequest';

@injectable()
export class EquipmentMutation implements IResolver<IResolverObject> {
  readonly resolvers: IResolverObject;

  constructor(
    @inject(DOMAIN_APPLICATION_SERVICE_IDENTIFIERS.EQUIPMENT_SERVICE)
    private readonly equipmentService: IEquipmentService
  ) {
    this.resolvers = {
      createEquipment: this.createEquipment,
    };
  }

  private createEquipment = (
    _root: unknown,
    { input: { name } }: { input: CreateEquipmentInput },
    { viewer }: Context
  ) =>
    this.equipmentService.createEquipment(
      new CreateEquipmentRequest(name, viewer!.id)
    );
}

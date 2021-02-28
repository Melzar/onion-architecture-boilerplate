import { inject, injectable } from 'inversify';

import { State } from 'core/domain/State/State';
import { DOMAIN_REPOSITORY_IDENTIFIERS } from 'core/CoreModuleSymbols';
import { IWarehouseStateService } from 'core/applicationServices/Warehouse/IWarehouseStateService';
import { IWarehouseStateRepository } from 'core/domainServices/Warehouse/IWarehouseStateRepository';
import { FetchWarehouseStateRequest } from 'core/applicationServices/Warehouse/requests/FetchWarehouseStateRequest';
import { GetWarehouseStateRepositoryRequest } from 'core/domainServices/Warehouse/request/GetWarehouseStateRepositoryRequest';

@injectable()
export class WarehouseStateService implements IWarehouseStateService {
  constructor(
    @inject(DOMAIN_REPOSITORY_IDENTIFIERS.WAREHOUSE_STATE_REPOSITORY)
    private readonly warehouseStateRepository: IWarehouseStateRepository
  ) {}

  fetchState({ warehouseId }: FetchWarehouseStateRequest): Promise<State> {
    return this.warehouseStateRepository.getState(
      new GetWarehouseStateRepositoryRequest(warehouseId)
    );
  }
}

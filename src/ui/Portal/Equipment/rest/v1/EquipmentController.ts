import {
  BaseHttpController,
  controller,
  httpPost,
  request,
  requestBody,
  results,
} from 'inversify-express-utils';
import { inject } from 'inversify';

import { Request } from 'express';

import { OK } from 'http-status-codes';

import { DOMAIN_APPLICATION_SERVICE_IDENTIFIERS } from 'core/CoreModuleSymbols';
import { IEquipmentService } from 'core/applicationServices/Equipment/IEquipmentService';
import { CreateEquipmentRequest } from 'core/applicationServices/Equipment/requests/CreateEquipmentRequest';
import { USER_ROLE } from 'core/domain/User/UserRole';

import { CreateEquipmentRequestBody } from 'ui/Portal/Equipment/rest/v1/requests/CreateEquipmentRequestBody';
import { isAuthenticated } from 'ui/common/config/application/express/auth/middlewares/IsAuthenticated';
import { getCurrentUser } from 'ui/common/config/application/express/auth/utils/getHttpContext';

@controller('/v1/equipment')
export class EquipmentController extends BaseHttpController {
  constructor(
    @inject(DOMAIN_APPLICATION_SERVICE_IDENTIFIERS.EQUIPMENT_SERVICE)
    private readonly equipmentService: IEquipmentService
  ) {
    super();
  }

  @httpPost('/', isAuthenticated({ role: USER_ROLE.MEMBER }))
  public async create(
    @requestBody()
    { name, width, height, depth }: CreateEquipmentRequestBody,
    @request()
    req: Request
  ): Promise<results.JsonResult> {
    const currentUser = getCurrentUser(req);

    const createdEquipment = await this.equipmentService.createEquipment(
      new CreateEquipmentRequest(
        name,
        width,
        height,
        depth,
        currentUser.details!.id
      )
    );
    return this.json(createdEquipment, OK);
  }
}

import {
  BaseHttpController,
  controller,
  httpPost,
  request,
  requestBody,
  results,
} from 'inversify-express-utils';
import { inject } from 'inversify';

import httpStatus from 'http-status';

import { Request } from 'express';

import { DOMAIN_APPLICATION_SERVICE_IDENTIFIERS } from 'core/CoreModuleSymbols';
import { IEquipmentService } from 'core/applicationServices/Equipment/IEquipmentService';
import { CreateEquipmentRequest } from 'core/applicationServices/Equipment/requests/CreateEquipmentRequest';
import { USER_ROLE } from 'core/domain/User/UserRole';

import { CreateEquipmentRequestBody } from 'ui/controllers/v1/Equipment/requests/CreateEquipmentRequestBody';
import { isAuthenticated } from 'ui/config/auth/middlewares/IsAuthenticated';
import { getCurrentUser } from 'ui/config/auth/utils/getHttpContext';

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
    { name }: CreateEquipmentRequestBody,
    @request()
    req: Request
  ): Promise<results.JsonResult> {
    const currentUser = getCurrentUser(req);

    await this.equipmentService.createEquipment(
      new CreateEquipmentRequest(name, currentUser.details!.id)
    );
    return this.json({ status: 'OK' }, httpStatus.OK);
  }
}

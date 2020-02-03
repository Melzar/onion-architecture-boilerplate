import {
  BaseHttpController,
  controller,
  httpDelete,
  requestBody,
} from 'inversify-express-utils';
import { inject } from 'inversify';

import httpStatus from 'http-status';

import { DOMAIN_APPLICATION_SERVICE_IDENTIFIERS } from 'core/CoreModuleSymbols';
import { IUserService } from 'core/applicationServices/User/IUserService';
import { USER_ROLE } from 'core/domain/User/UserRole';
import { RemoveUserRequest } from 'core/applicationServices/User/requests/RemoveUserReuqest';

import { isAuthenticated } from 'ui/config/auth/middleware/IsAuthenticated';
import { DeleteUserRequestBody } from 'ui/controllers/v1/User/requests/DeleteUserRequestBody';

@controller('/v1/user')
export class UserController extends BaseHttpController {
  constructor(
    @inject(DOMAIN_APPLICATION_SERVICE_IDENTIFIERS.USER_SERVICE)
    private readonly userService: IUserService
  ) {
    super();
  }

  @httpDelete('/', isAuthenticated({ role: USER_ROLE.MEMBER }))
  public async delete(@requestBody() { id }: DeleteUserRequestBody) {
    await this.userService.removeUser(new RemoveUserRequest(id));

    return this.json({ status: 'OK' }, httpStatus.OK);
  }
}

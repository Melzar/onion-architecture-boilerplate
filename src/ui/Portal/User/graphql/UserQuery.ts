import { inject, injectable } from 'inversify';

import { IResolverObject } from 'apollo-server-express';

import { IResolver } from 'ui/common/config/application/apollo/common/IResolver';
import { DOMAIN_APPLICATION_SERVICE_IDENTIFIERS } from 'core/CoreModuleSymbols';
import { IUserService } from 'core/applicationServices/User/IUserService';
import { FetchUserRequest } from 'core/applicationServices/User/requests/FetchUserRequest';
import { Context } from 'ui/common/config/application/apollo/types/Context';

@injectable()
export class UserQuery implements IResolver<IResolverObject> {
  readonly resolvers: IResolverObject;

  constructor(
    @inject(DOMAIN_APPLICATION_SERVICE_IDENTIFIERS.USER_SERVICE)
    private readonly userService: IUserService
  ) {
    this.resolvers = {
      me: this.me,
    };
  }

  private me = (_root: unknown, _args: unknown, { viewer }: Context) => {
    return this.userService.fetchUser(new FetchUserRequest(viewer!.id));
  };
}

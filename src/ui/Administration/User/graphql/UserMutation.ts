import { IResolverObject } from 'apollo-server-express';

import { inject, injectable } from 'inversify';

import { IResolver } from 'ui/common/config/application/apollo/common/IResolver';
import { RemoveUserInput } from 'ui/Administration/User/graphql/inputs/RemoveUserInput';

import { DOMAIN_APPLICATION_SERVICE_IDENTIFIERS } from 'core/CoreModuleSymbols';
import { IUserService } from 'core/applicationServices/User/IUserService';
import { RemoveUserRequest } from 'core/applicationServices/User/requests/RemoveUserReuqest';

@injectable()
export class UserMutation implements IResolver<IResolverObject> {
  readonly resolvers: IResolverObject;

  constructor(
    @inject(DOMAIN_APPLICATION_SERVICE_IDENTIFIERS.USER_SERVICE)
    private readonly userService: IUserService
  ) {
    this.resolvers = {
      removeUser: this.removeUser,
    };
  }

  private removeUser = (
    _root: unknown,
    { input: { id } }: { input: RemoveUserInput }
  ) => {
    return this.userService.removeUser(new RemoveUserRequest(id));
  };
}

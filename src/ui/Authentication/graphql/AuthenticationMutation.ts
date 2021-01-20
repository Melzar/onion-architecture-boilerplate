import { IResolverObject } from 'apollo-server-express';

import { inject, injectable } from 'inversify';

import { UI_APPLICATION_IDENTIFIERS } from 'ui/UiModuleSymbols';
import { IResolver } from 'ui/common/config/application/apollo/common/IResolver';
import { IAuthenticationHandler } from 'ui/common/config/application/common/auth/IAuthenticationHandler';

import { AuthenticationRequest } from 'core/applicationServices/Authentication/requests/AuthenticationRequest';
import { AuthenticateInput } from 'ui/Authentication/graphql/inputs/AuthenticateInput';

@injectable()
export class AuthenticationMutation implements IResolver<IResolverObject> {
  readonly resolvers: IResolverObject;

  constructor(
    @inject(UI_APPLICATION_IDENTIFIERS.GRAPHQL_JWT_AUTHENTICATION_HANDLER)
    private readonly authenticationHandler: IAuthenticationHandler
  ) {
    this.resolvers = {
      authenticate: this.authenticate,
    };
  }

  private authenticate = (
    _root: unknown,
    { input: { email, password } }: { input: AuthenticateInput }
  ) => {
    return this.authenticationHandler.authenticate(
      new AuthenticationRequest(email, password)
    );
  };
}

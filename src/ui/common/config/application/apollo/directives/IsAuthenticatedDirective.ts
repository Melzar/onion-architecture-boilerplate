import { GraphQLFieldResolver, GraphQLResolveInfo } from 'graphql';

import { ForbiddenError } from 'apollo-server-errors';

import { BaseDirective } from 'ui/common/config/application/apollo/directives/BaseDirective';

type IsAuthenticatedArguments = {
  role: string; // TODO Change to enum
};

export class IsAuthenticatedDirective extends BaseDirective {
  protected resolveField(
    resolve: GraphQLFieldResolver<any, any>,
    args: [any, { [argName: string]: any }, any, GraphQLResolveInfo],
    directiveArgs: IsAuthenticatedArguments
  ): Promise<any> {
    const [, , { viewer, claims }] = args;

    if (!viewer) {
      throw new ForbiddenError('FORBIDDEN ACCESS');
    }

    const { role } = directiveArgs;

    if (!role) {
      return resolve.apply(this, args);
    }

    if (!claims || !role.includes(claims.role)) {
      throw new ForbiddenError('FORBIDDEN ACCESS'); // TODO Apply error enums at least
    }

    return resolve.apply(this, args);
  }
}

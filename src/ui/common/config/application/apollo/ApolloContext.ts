import { Request } from 'express';

import { inject, injectable } from 'inversify';

import { IApolloContext } from 'ui/common/config/application/apollo/common/IApolloContext';
import { Context } from 'ui/common/config/application/apollo/types/Context';
import { JWTTokenUtil } from 'ui/common/config/application/common/auth/utils/JWTTokenUtil';
import { UI_APPLICATION_IDENTIFIERS } from 'ui/UiModuleSymbols';
import { GraphQLTokenPayload } from 'ui/common/config/application/apollo/auth/types/GraphQLTokenPayload';

@injectable()
export class ApolloContext implements IApolloContext {
  constructor(
    @inject(UI_APPLICATION_IDENTIFIERS.JWT_TOKEN_UTIL)
    public readonly jwtTokenUtil: JWTTokenUtil
  ) {}

  context = async ({ req }: { req: Request }): Promise<Context> => {
    const token = (req.headers.authorization || '').replace('Bearer ', '');

    // https://github.com/apollographql/apollo-server/issues/3039
    // https://github.com/apollographql/apollo-server/issues/1709
    // https://github.com/apollographql/apollo-server/issues/1709#issuecomment-495793375
    // As long as first issue won't be resolved we won't be able to do it differently
    // without integrating express in this flow

    try {
      const { viewer, claims } = this.jwtTokenUtil.decodeToken<
        GraphQLTokenPayload
      >(token);
      return {
        claims,
        viewer,
      };
    } catch {
      // If there is an error and directive is applied directive will throw Forbidden error
      return {};
    }
  };
}

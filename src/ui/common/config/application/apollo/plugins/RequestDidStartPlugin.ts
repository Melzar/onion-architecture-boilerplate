import { ForbiddenError } from 'apollo-server-express';
import {
  ApolloServerPlugin,
  GraphQLRequestListener,
} from 'apollo-server-plugin-base';

import { injectable } from 'inversify';

import { Context } from 'ui/common/config/application/apollo/types/Context';

// https://github.com/apollographql/apollo-server/issues/1709#issuecomment-575086351
@injectable()
export class RequestDidStartPlugin implements ApolloServerPlugin {
  requestDidStart(): GraphQLRequestListener<Context> | void {
    return {
      willSendResponse({ response, errors }) {
        if (response && response.http) {
          if (
            errors &&
            errors.find(err => err.originalError instanceof ForbiddenError)
          ) {
            response.data = undefined;
            response.http.status = 401;
          }
        }
      },
    };
  }
}

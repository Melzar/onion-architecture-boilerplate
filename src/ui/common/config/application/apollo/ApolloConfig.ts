import path from 'path';

import { ApolloServerExpressConfig } from 'apollo-server-express';
import { inject, injectable } from 'inversify';
import { mergeTypeDefs } from '@graphql-tools/merge';
import { loadFilesSync } from '@graphql-tools/load-files';
import { DocumentNode } from 'graphql';

import { ApolloServerPlugin } from 'apollo-server-plugin-base';

import { UI_APPLICATION_IDENTIFIERS } from 'ui/UiModuleSymbols';
import { IConfig } from 'ui/common/config/application/common/IConfig';
import { IResolver } from 'ui/common/config/application/apollo/common/IResolver';
import { schemaDirectives } from 'ui/common/config/application/apollo/consts/schemaDirectives';
import { IApolloContext } from 'ui/common/config/application/apollo/common/IApolloContext';

@injectable()
export class ApolloConfig implements IConfig<ApolloServerExpressConfig> {
  constructor(
    @inject(UI_APPLICATION_IDENTIFIERS.APOLLO_CONTEXT)
    public readonly apolloContext: IApolloContext,
    @inject(UI_APPLICATION_IDENTIFIERS.APOLLO_REQUEST_DID_START_PLUGIN)
    public readonly requestDidStartPlugin: ApolloServerPlugin,
    @inject(UI_APPLICATION_IDENTIFIERS.SCHEMA_ROOT_RESOLVER)
    public readonly rootResolver: IResolver
  ) {}

  initialize(): ApolloServerExpressConfig {
    const typeDefs = this.loadTypesDefinition();

    return {
      schemaDirectives,
      context: this.apolloContext.context,
      resolvers: this.rootResolver.resolvers,
      typeDefs,
      plugins: [this.requestDidStartPlugin],
    };
  }

  private loadTypesDefinition(): DocumentNode {
    // The GraphQL schema
    const extractedTypeDefs = loadFilesSync(
      path.join(__dirname, '../../../../**/gql/**/*.graphql'), // TODO change this relative path
      {
        recursive: true,
      }
    );

    return mergeTypeDefs(extractedTypeDefs);
  }
}

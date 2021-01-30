import { Format } from 'logform';
import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { interfaces } from 'inversify';
import { createLogger, format, Logger } from 'winston';

import { ApolloServerExpressConfig } from 'apollo-server-express/src/ApolloServer';

import { ApolloServerPlugin } from 'apollo-server-plugin-base';

import { IApplication } from 'ui/common/config/application/common/IApplication';

import { ExpressApplication } from 'ui/common/config/application/express/ExpressApplication';

import { BaseModule } from 'dependency/BaseModule';

import { ILogger } from 'ui/common/config/logger/ILogger';
import { WinstonLogger } from 'ui/common/config/logger/WinstonLogger';
import { LOG_LEVEL } from 'ui/common/config/consts/variables';
import { UI_APPLICATION_IDENTIFIERS } from 'ui/UiModuleSymbols';
/**
 @description Need to import it once for inversify express utils - if you find better way to do it please share
 @link https://github.com/inversify/inversify-express-utils#important-information-about-the-controller-decorator
 */
import 'ui/index';
import { JWTTokenUtil } from 'ui/common/config/application/common/auth/utils/JWTTokenUtil';
import { JWTAuthenticationHandler } from 'ui/common/config/application/express/auth/JWTAuthenticationHandler';
import { IAuthenticationHandler } from 'ui/common/config/application/common/auth/IAuthenticationHandler';
import { IConfig } from 'ui/common/config/application/common/IConfig';
import { ApolloConfig } from 'ui/common/config/application/apollo/ApolloConfig';
import { ApolloApplication } from 'ui/common/config/application/apollo/ApolloApplication';
import { IApolloContext } from 'ui/common/config/application/apollo/common/IApolloContext';
import { ApolloContext } from 'ui/common/config/application/apollo/ApolloContext';
import { IResolver } from 'ui/common/config/application/apollo/common/IResolver';
import { RootResolver } from 'ui/common/config/application/apollo/schema/RootResolver';
import { RootQuery } from 'ui/common/config/application/apollo/schema/RootQuery';
import { RootMutation } from 'ui/common/config/application/apollo/schema/RootMutation';
import { RootSubQuery } from 'ui/common/config/application/apollo/schema/RootSubQuery';
import { RequestDidStartPlugin } from 'ui/common/config/application/apollo/plugins/RequestDidStartPlugin';
import { GraphQLJWTAuthenticationHandler } from 'ui/common/config/application/apollo/auth/GraphQLJWTAuthenticationHandler';

export class ApplicationModule extends BaseModule {
  constructor() {
    super((bind: interfaces.Bind): void => {
      this.init(bind);
    });
  }

  init(bind: interfaces.Bind): void {
    this.provideExpress(bind);
    this.provideExpressRouter(bind);

    this.provideApolloContext(bind);
    this.provideApolloRequestDidStartPlugin(bind);
    this.provideApolloConfig(bind);
    this.provideApolloServerConfig(bind);
    this.provideApolloServer(bind);

    this.provideLoggerFormat(bind);
    this.provideLogger(bind);
    this.provideWinstonLogger(bind);
    this.provideJWTTokenUtil(bind);
    this.provideGraphQLAuthenticationHandler(bind);
    this.provideJWTAuthenticationHandler(bind);

    this.provideRootQuery(bind);
    this.provideRootMutation(bind);
    this.provideRootSubquery(bind);

    this.provideApolloSchemaRootResolver(bind);

    this.provideExpressApplication(bind);
    this.provideApolloApplication(bind);
  }

  private provideExpress(bind: interfaces.Bind): void {
    bind<express.Application>(
      UI_APPLICATION_IDENTIFIERS.EXPRESS
    ).toConstantValue(express());
  }

  private provideExpressRouter(bind: interfaces.Bind): void {
    bind<express.Router>(
      UI_APPLICATION_IDENTIFIERS.EXPRESS_ROUTER
    ).toConstantValue(
      express.Router({
        caseSensitive: false,
        mergeParams: false,
        strict: false,
      })
    );
  }

  private provideApolloContext(bind: interfaces.Bind): void {
    bind<IApolloContext>(UI_APPLICATION_IDENTIFIERS.APOLLO_CONTEXT).to(
      ApolloContext
    );
  }

  private provideApolloRequestDidStartPlugin(bind: interfaces.Bind): void {
    bind<ApolloServerPlugin>(
      UI_APPLICATION_IDENTIFIERS.APOLLO_REQUEST_DID_START_PLUGIN
    ).to(RequestDidStartPlugin);
  }

  private provideApolloConfig(bind: interfaces.Bind): void {
    bind<IConfig<ApolloServerExpressConfig>>(
      UI_APPLICATION_IDENTIFIERS.APOLLO_CONFIG
    ).to(ApolloConfig);
  }

  private provideApolloServerConfig(bind: interfaces.Bind): void {
    bind<ApolloServerExpressConfig>(
      UI_APPLICATION_IDENTIFIERS.APOLLO_SERVER_CONFIG
    ).toDynamicValue(({ container }) =>
      container
        .get<IConfig<ApolloServerExpressConfig>>(
          UI_APPLICATION_IDENTIFIERS.APOLLO_CONFIG
        )
        .initialize()
    );
  }

  private provideApolloServer(bind: interfaces.Bind): void {
    bind<ApolloServer>(UI_APPLICATION_IDENTIFIERS.APOLLO_SERVER).toDynamicValue(
      ({ container }) =>
        new ApolloServer(
          container.get<ApolloServerExpressConfig>(
            UI_APPLICATION_IDENTIFIERS.APOLLO_SERVER_CONFIG
          )
        )
    );
  }

  private provideLogger(bind: interfaces.Bind): void {
    bind<Logger>(UI_APPLICATION_IDENTIFIERS.LOGGER).toConstantValue(
      createLogger({
        exitOnError: false,
        level: LOG_LEVEL,
      })
    );
  }

  private provideLoggerFormat(bind: interfaces.Bind): void {
    bind<Format>(UI_APPLICATION_IDENTIFIERS.LOGGER_FORMAT).toConstantValue(
      format.combine(
        format.colorize({
          all: true,
        }),
        format.label({
          label: '[LOGGER]',
        }),
        format.timestamp({
          format: 'YY-MM-DD HH:MM:SS',
        }),
        format.printf(
          info =>
            `${info.label} ${info.timestamp} [${info.level}] : ${info.message} `
        )
      )
    );
  }

  private provideWinstonLogger(bind: interfaces.Bind): void {
    bind<ILogger>(UI_APPLICATION_IDENTIFIERS.LOGGER_WINSTON).to(WinstonLogger);
  }

  private provideJWTTokenUtil(bind: interfaces.Bind): void {
    bind<JWTTokenUtil>(UI_APPLICATION_IDENTIFIERS.JWT_TOKEN_UTIL).to(
      JWTTokenUtil
    );
  }

  private provideGraphQLAuthenticationHandler(bind: interfaces.Bind): void {
    bind<IAuthenticationHandler>(
      UI_APPLICATION_IDENTIFIERS.GRAPHQL_JWT_AUTHENTICATION_HANDLER
    ).to(GraphQLJWTAuthenticationHandler);
  }

  private provideJWTAuthenticationHandler(bind: interfaces.Bind): void {
    bind<IAuthenticationHandler>(
      UI_APPLICATION_IDENTIFIERS.JWT_AUTHENTICATION_HANDLER
    ).to(JWTAuthenticationHandler);
  }

  private provideRootQuery(bind: interfaces.Bind): void {
    bind<IResolver>(UI_APPLICATION_IDENTIFIERS.SCHEMA_QUERIES).to(RootQuery);
  }

  private provideRootMutation(bind: interfaces.Bind): void {
    bind<IResolver>(UI_APPLICATION_IDENTIFIERS.SCHEMA_MUTATIONS).to(
      RootMutation
    );
  }

  private provideRootSubquery(bind: interfaces.Bind): void {
    bind<IResolver>(UI_APPLICATION_IDENTIFIERS.SCHEMA_SUBQUERIES).to(
      RootSubQuery
    );
  }

  private provideApolloSchemaRootResolver(bind: interfaces.Bind): void {
    bind<IResolver>(UI_APPLICATION_IDENTIFIERS.SCHEMA_ROOT_RESOLVER).to(
      RootResolver
    );
  }

  private provideExpressApplication(bind: interfaces.Bind): void {
    bind<IApplication>(UI_APPLICATION_IDENTIFIERS.EXPRESS_APPLICATION).to(
      ExpressApplication
    );
  }

  private provideApolloApplication(bind: interfaces.Bind): void {
    bind<IApplication>(UI_APPLICATION_IDENTIFIERS.APOLLO_APPLICATION).to(
      ApolloApplication
    );
  }
}

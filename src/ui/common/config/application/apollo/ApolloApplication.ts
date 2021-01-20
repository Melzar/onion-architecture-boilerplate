import { ApolloServer } from 'apollo-server-express';

import { inject, injectable } from 'inversify';

import express from 'express';

import { BaseApplication } from 'ui/common/config/application/common/BaseApplication';
import { IApplication } from 'ui/common/config/application/common/IApplication';

import { UI_APPLICATION_IDENTIFIERS } from 'ui/UiModuleSymbols';
import { APOLLO_BASE_PATH } from 'ui/common/config/consts/variables';

@injectable()
export class ApolloApplication extends BaseApplication<ApolloServer>
  implements IApplication {
  private readonly expressApp: express.Application;

  constructor(
    @inject(UI_APPLICATION_IDENTIFIERS.APOLLO_SERVER) app: ApolloServer,
    @inject(UI_APPLICATION_IDENTIFIERS.EXPRESS) expressApp: express.Application
  ) {
    super(app);
    this.expressApp = expressApp;
  }

  initialize(): void {
    this.initializeExtensions();
  }

  initializeBodyParsers(): void {
    Error('NOT IMPLEMENTED');
  }

  initializeExtensions(): void {
    this.app.applyMiddleware({
      app: this.expressApp,
      path: APOLLO_BASE_PATH,
      cors: true,
    });
  }

  initializeHandlers(): void {
    Error('NOT IMPLEMENTED');
  }

  initializeLogging(): void {
    Error('NOT IMPLEMENTED');
  }

  initializePlugins(): void {
    Error('NOT IMPLEMENTED');
  }

  initializeSecurity(): void {
    Error('NOT IMPLEMENTED');
  }
}

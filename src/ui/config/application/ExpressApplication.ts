import express from 'express';
import morgan from 'morgan';
import methodOverride from 'method-override';
import helmet from 'helmet';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import { inject, injectable } from 'inversify';

import { IApplication } from 'ui/config/application/IApplication';
import { BaseApplication } from 'ui/config/application/BaseApplication';
import { ILogger } from 'ui/config/logger/ILogger';
import { SWAGGER_HOST } from 'ui/config/consts/variables';
import { UI_APPLICATION_IDENTIFIERS } from 'ui/UiModuleSymbols';

import swaggerDocument from 'ui/config/swagger.json';

@injectable()
export class ExpressApplication extends BaseApplication<express.Application>
  implements IApplication {
  private readonly logger: ILogger;

  constructor(
    @inject(UI_APPLICATION_IDENTIFIERS.LOGGER_WINSTON) logger: ILogger,
    @inject(UI_APPLICATION_IDENTIFIERS.EXPRESS) app: express.Application
  ) {
    super(app);
    this.logger = logger;
  }

  public initialize(): void {
    this.initializeSecurity();
    this.initializeBodyParsers();
    if (process.env.NODE_ENV !== 'test') {
      this.initializeLogging();
    }
    this.initializeHandlers();
    this.initializePlugins();
    this.initializeExtensions();
  }

  public initializeSecurity(): void {
    this.app.use(express.urlencoded({ extended: false }));
  }

  public initializeBodyParsers(): void {
    this.app.use(express.json());
  }

  public initializeLogging(): void {
    this.logger.initialize();
    morgan.token(
      'body',
      (req): string => `\nREQUEST BODY: ${JSON.stringify(req.body)}`
    );
    /**
     * @description you may consider what you want to log on production
     * keep in mind to obfuscate sensitive data if you want to log request or response bodies
     * format can be moved to some other place for easier configuration
     */
    this.app.use(
      morgan(
        ':method :url HTTP/:http-version :status :response-time ms :referrer :user-agent - :body',
        { stream: this.logger }
      )
    );
  }

  public initializeHandlers(): void {
    Error('NOT IMPLEMENTED');
  }

  public initializePlugins(): void {
    this.app.use(methodOverride());
    this.app.use(helmet());
    this.app.use(cors());
  }

  public initializeExtensions(): void {
    if (SWAGGER_HOST) {
      swaggerDocument.host = SWAGGER_HOST;
      this.app.use(
        '/api-docs',
        swaggerUi.serve,
        swaggerUi.setup(swaggerDocument)
      );
    }
  }
}

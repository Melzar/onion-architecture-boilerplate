import express from 'express';
import morgan from 'morgan';
import methodOverride from 'method-override';
import helmet from 'helmet';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import { inject, injectable } from 'inversify';

import { IApplication } from 'ui/common/config/application/common/IApplication';
import { BaseApplication } from 'ui/common/config/application/common/BaseApplication';
import { ILogger } from 'ui/common/config/logger/ILogger';
import {
  SWAGGER_HOST,
  SWAGGER_BASE_PATH,
  APOLLO_BASE_PATH,
} from 'ui/common/config/consts/variables';
import { UI_APPLICATION_IDENTIFIERS } from 'ui/UiModuleSymbols';

import swaggerDocument from 'ui/common/config/swagger.json';
import { unless } from 'ui/common/config/application/express/utils/unless';

@injectable()
export class ExpressApplication extends BaseApplication<express.Application>
  implements IApplication {
  private readonly logger: ILogger;

  private readonly router: express.Router;

  constructor(
    @inject(UI_APPLICATION_IDENTIFIERS.LOGGER_WINSTON) logger: ILogger,
    @inject(UI_APPLICATION_IDENTIFIERS.EXPRESS) app: express.Application,
    @inject(UI_APPLICATION_IDENTIFIERS.EXPRESS_ROUTER) router: express.Router
  ) {
    super(app);
    this.logger = logger;
    this.router = router;
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
    this.app.use(unless(APOLLO_BASE_PATH, this.router));

    if (SWAGGER_HOST) {
      swaggerDocument.host = SWAGGER_HOST;
      this.app.use(
        SWAGGER_BASE_PATH,
        swaggerUi.serve,
        swaggerUi.setup(swaggerDocument)
      );
    }
  }
}

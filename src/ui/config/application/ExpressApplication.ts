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
import { APPLICATION_IDENTIFIERS } from 'ui/UiModuleSymbols';

import swaggerDocument from 'ui/config/swagger.json';

@injectable()
export class ExpressApplication extends BaseApplication<express.Application> implements IApplication {
  private readonly logger: ILogger;

  constructor(
      @inject(APPLICATION_IDENTIFIERS.LOGGER_WINSTON) logger: ILogger,
      @inject(APPLICATION_IDENTIFIERS.EXPRESS) app: express.Application,
  ) {
    super(app);
    this.logger = logger;
  }

  public initialize(): void {
    this.initializeSecurity();
    this.initializeBodyParsers();
    this.initializeLogging();
    this.initializeHandlers();
    this.initializePlugins();
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
      (req): string => `\nREQUEST BODY: ${JSON.stringify(req.body)}`,
    ); // TODO you may consider what you want to log on production
    // TODO keep in mind to obfuscate sensitive data if you want to log request or response bodies
    // TODO format can be moved to some other place for easier configuration
    this.app.use(
      morgan(
        ':method :url HTTP/:http-version :status :response-time ms :referrer :user-agent - :body',
        { stream: this.logger },
      ),
    ); // TODO Move 'combined' to const
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  public initializeRoutes(): void {
  }

  public initializeHandlers(): void {
    // // TODO Export handlers to separate files and apply them here
    // // catch 404 and forward to error handler
    // this.app.use((req, res, next) => {
    //   next(createError(404));
    // });
    //
    // // TODO Export handlers to separate files and apply them here
    // // error handler
    // this.app.use((err, req, res, next) => {
    //   // set locals, only providing error in development
    //   res.locals.message = err.message;
    //   res.locals.error = req.app.get('env') === 'development' ? err : {};
    //
    //   // render the error page
    //   res.status(err.status || 500);
    //   res.render('error');
    // });
  }

  public initializePlugins(): void {
    this.app.use(methodOverride());
    this.app.use(helmet());
    this.app.use(cors());

    if (SWAGGER_HOST) {
      swaggerDocument.host = SWAGGER_HOST;
      this.app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
    }
  }
}

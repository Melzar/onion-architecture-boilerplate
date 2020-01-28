import { Format } from 'logform';
import express from 'express';
import { interfaces } from 'inversify';
import { createLogger, format, Logger } from 'winston';

import { BaseModule } from 'dependency/BaseModule';
import { IApplication } from 'ui/config/application/IApplication';
import { ExpressApplication } from 'ui/config/application/ExpressApplication';
import { ILogger } from 'ui/config/logger/ILogger';
import { WinstonLogger } from 'ui/config/logger/WinstonLogger';
import { LOG_LEVEL } from 'ui/config/consts/variables';
import { APPLICATION_IDENTIFIERS } from 'ui/UiModuleSymbols';
/**
 @description Need to import it once for inversify express utils - if you find better way to do it please share
 @link https://github.com/inversify/inversify-express-utils#important-information-about-the-controller-decorator
 */
import 'ui/controllers';
import { JWTTokenUtil } from 'ui/config/auth/util/JWTTokenUtil';
import { JWTAuthenticationHandler } from 'ui/config/auth/JWTAuthenticationHandler';
import { IAuthenticationHandler } from 'ui/config/auth/IAuthenticationHandler';

export class ApplicationModule extends BaseModule {
  constructor() {
    super((bind: interfaces.Bind): void => {
      this.init(bind);
    });
  }

  init(bind: interfaces.Bind): void {
    this.provideExpress(bind);
    this.provideLoggerFormat(bind);
    this.provideLogger(bind);
    this.provideWinstonLogger(bind);
    this.provideJWTTokenUtil(bind);
    this.provideJWTAuthenticationHandler(bind);

    this.provideExpressApplication(bind);
  }

  private provideExpress(bind: interfaces.Bind): void {
    bind<express.Application>(APPLICATION_IDENTIFIERS.EXPRESS).toConstantValue(
      express()
    );
  }

  private provideLogger(bind: interfaces.Bind): void {
    bind<Logger>(APPLICATION_IDENTIFIERS.LOGGER).toConstantValue(
      createLogger({
        exitOnError: false,
        level: LOG_LEVEL,
      })
    );
  }

  private provideLoggerFormat(bind: interfaces.Bind): void {
    bind<Format>(APPLICATION_IDENTIFIERS.LOGGER_FORMAT).toConstantValue(
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
    bind<ILogger>(APPLICATION_IDENTIFIERS.LOGGER_WINSTON).to(WinstonLogger);
  }

  private provideExpressApplication(bind: interfaces.Bind): void {
    bind<IApplication>(APPLICATION_IDENTIFIERS.EXPRESS_APPLICATION).to(
      ExpressApplication
    );
  }

  private provideJWTTokenUtil(bind: interfaces.Bind): void {
    bind<JWTTokenUtil>(APPLICATION_IDENTIFIERS.JWT_TOKEN_UTIL).to(JWTTokenUtil);
  }

  private provideJWTAuthenticationHandler(bind: interfaces.Bind): void {
    bind<IAuthenticationHandler>(
      APPLICATION_IDENTIFIERS.JWT_AUTHENTICATION_HANDLER
    ).to(JWTAuthenticationHandler);
  }
}

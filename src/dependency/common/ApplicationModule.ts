import { Format } from 'logform';
import express from 'express';
import { interfaces } from 'inversify';
import { createLogger, format, Logger } from 'winston';

import { BaseModule } from 'dependency/BaseModule';
import { IApplication } from 'ui/config/application/IApplication';
import { ExpressApplication } from 'ui/config/application/ExpressApplication';
import { ILogger } from 'ui/config/logger/ILogger';
import { WinstonLogger } from 'ui/config/logger/WinstonLogger';
import { BaseRouter } from 'ui/routes/BaseRouter';
import { RootRouter } from 'ui/routes/v1/RootRouter';
import { APPLICATION_IDENTIFIERS } from 'dependency/common/ApplicationModuleSymbols';

import core from 'express-serve-static-core';

const defaultLevel = process.env.LOG_LEVEL || 'debug'; // TODO Export to const

export class ApplicationModule extends BaseModule {
  constructor() {
    super((bind: interfaces.Bind) => {
      this.init(bind);
    });
  }

  init(bind: interfaces.Bind): void {
    this.provideExpress(bind);
    this.provideLoggerFormat(bind);
    this.provideLogger(bind);
    this.provideWinstonLogger(bind);

    this.provideRootRouter(bind);
    this.provideExpressApplication(bind);
  }

  private provideExpress(bind: interfaces.Bind): void {
    bind<express.Application>(APPLICATION_IDENTIFIERS.EXPRESS).toConstantValue(express());
  }

  private provideLogger(bind: interfaces.Bind): void {
    bind<Logger>(APPLICATION_IDENTIFIERS.LOGGER).toConstantValue(createLogger({
      exitOnError: false,
      level: defaultLevel,
    }));
  }

  private provideLoggerFormat(bind: interfaces.Bind): void {
    bind<Format>(APPLICATION_IDENTIFIERS.LOGGER_FORMAT).toConstantValue(format.combine(
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
        info => `${info.label} ${info.timestamp} [${info.level}] : ${info.message} `,
      ),
    ));
  }

  private provideWinstonLogger(bind: interfaces.Bind): void {
    bind<ILogger>(APPLICATION_IDENTIFIERS.LOGGER_WINSTON).to(WinstonLogger);
  }

  private provideRootRouter(bind: interfaces.Bind): void {
    bind<BaseRouter<core.Router>>(APPLICATION_IDENTIFIERS.ROOT_ROUTER).to(RootRouter);
  }

  private provideExpressApplication(bind: interfaces.Bind): void {
    bind<IApplication>(APPLICATION_IDENTIFIERS.EXPRESS_APPLICATION).to(ExpressApplication);
  }
}

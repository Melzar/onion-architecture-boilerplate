import { format as winstonFormat, Logger, transports } from 'winston';
import { Format } from 'logform';
import DailyRotateFile from 'winston-daily-rotate-file';

import { inject, injectable } from 'inversify';

import { BaseLogger } from 'ui/config/logger/BaseLogger';
import { ILogger } from 'ui/config/logger/ILogger';

import { APPLICATION_IDENTIFIERS } from 'ui/UiModuleSymbols';

@injectable()
export class WinstonLogger extends BaseLogger<Logger> implements ILogger {
  private readonly format: Format;

  constructor(
    @inject(APPLICATION_IDENTIFIERS.LOGGER_FORMAT) format: Format,
    @inject(APPLICATION_IDENTIFIERS.LOGGER) logger: Logger
  ) {
    super(logger);
    this.format = format;
  }

  public initialize(): void {
    const loggerConfig = {
      format: this.format,
      dirname: './logs',
      datePattern: 'YYYY-MM-DD',
      zippedArchive: true,
      maxSize: '20m',
      maxFiles: '14d',
    };

    this.logger.add(
      new DailyRotateFile({
        level: 'info',
        filename: 'onion-%DATE%.info.log',
        ...loggerConfig,
      })
    );

    this.logger.add(
      new DailyRotateFile({
        level: 'error',
        filename: 'onion-%DATE%.error.log',
        ...loggerConfig,
      })
    );

    this.logger.add(
      new DailyRotateFile({
        level: 'silly',
        filename: 'onion-%DATE%.silly.log',
        ...loggerConfig,
      })
    );

    if (process.env.NODE_ENV === 'development') {
      // TODO Export to some config file conditional statement
      this.logger.add(
        new transports.Console({
          level: 'debug',
          handleExceptions: true,
          format: winstonFormat.combine(winstonFormat.colorize(), this.format),
        })
      );
    }
  }

  write(message: string): void {
    this.logger.info(message);
  }
}

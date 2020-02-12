import { format as winstonFormat, Logger, transports } from 'winston';
import { Format } from 'logform';
import DailyRotateFile from 'winston-daily-rotate-file';

import { inject, injectable } from 'inversify';

import { BaseLogger } from 'ui/config/logger/BaseLogger';
import { ILogger } from 'ui/config/logger/ILogger';

import { UI_APPLICATION_IDENTIFIERS } from 'ui/UiModuleSymbols';
import { IS_DEVELOPMENT } from 'ui/config/consts/variables';

@injectable()
export class WinstonLogger extends BaseLogger<Logger> implements ILogger {
  private readonly format: Format;

  constructor(
    @inject(UI_APPLICATION_IDENTIFIERS.LOGGER_FORMAT) format: Format,
    @inject(UI_APPLICATION_IDENTIFIERS.LOGGER) logger: Logger
  ) {
    super(logger);
    this.format = format;
  }

  public initialize(): void {
    const loggerConfig = {
      datePattern: 'YYYY-MM-DD',
      dirname: './logs',
      format: this.format,
      maxFiles: '14d',
      maxSize: '20m',
      zippedArchive: true,
    };

    this.logger.add(
      new DailyRotateFile({
        filename: 'onion-%DATE%.info.log',
        level: 'info',
        ...loggerConfig,
      })
    );

    this.logger.add(
      new DailyRotateFile({
        filename: 'onion-%DATE%.error.log',
        level: 'error',
        ...loggerConfig,
      })
    );

    this.logger.add(
      new DailyRotateFile({
        filename: 'onion-%DATE%.silly.log',
        level: 'silly',
        ...loggerConfig,
      })
    );

    if (IS_DEVELOPMENT) {
      this.logger.add(
        new transports.Console({
          format: winstonFormat.combine(winstonFormat.colorize(), this.format),
          handleExceptions: true,
          level: 'debug',
        })
      );
    }
  }

  write(message: string): void {
    this.logger.info(message);
  }
}

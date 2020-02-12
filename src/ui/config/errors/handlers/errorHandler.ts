import { Application, NextFunction, Request, Response } from 'express';

import {
  INTERNAL_SERVER_ERROR,
  NOT_FOUND,
  UNPROCESSABLE_ENTITY,
} from 'http-status-codes';

import { BaseError } from 'core/common/errors/BaseError';
import { CoreError } from 'core/common/errors/CoreError';
import { ErrorResponse } from 'ui/config/errors/models/ErrorResponse';
import { UserInterfaceError } from 'ui/config/errors/UserInterfaceError';

export const errorHandler = (app: Application) =>
  app.use(
    (error: BaseError, req: Request, res: Response, next: NextFunction) => {
      next();
      switch (error.constructor) {
        case UserInterfaceError:
          return res
            .status((error as UserInterfaceError).status)
            .json(new ErrorResponse(error.code, error.message));
        case CoreError:
          return res
            .status(UNPROCESSABLE_ENTITY)
            .json(new ErrorResponse(error.code, error.message));
        case BaseError:
          return res
            .status(NOT_FOUND)
            .json(new ErrorResponse(error.code, error.message));
        default:
          return res
            .status(INTERNAL_SERVER_ERROR)
            .json(
              new ErrorResponse(INTERNAL_SERVER_ERROR.toString(), error.message)
            );
      }
    }
  );

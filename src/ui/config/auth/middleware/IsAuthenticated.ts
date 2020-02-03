import * as express from 'express';
import httpStatus from 'http-status';
import { interfaces } from 'inversify-express-utils';

// SOURCE: https://stackoverflow.com/questions/54218295/inject-httpcontext-into-inversifyjs-middleware/54233115#54233115
export const isAuthenticated = (config?: { role: string }) => async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
): Promise<void> => {
  // SOURCE: https://github.com/inversify/InversifyJS/issues/673
  const httpContext: interfaces.HttpContext = Reflect.getMetadata(
    'inversify-express-utils:httpcontext',
    req
  );

  // TODO SIMPLIFY IT
  if (!httpContext.user) {
    const error = { status: httpStatus.UNAUTHORIZED };
    res.status(httpStatus.UNAUTHORIZED).json(error);
    next(error);
    return;
  }

  const isAuthenticatedUser = await httpContext.user.isAuthenticated();

  if (!isAuthenticatedUser) {
    const error = { status: httpStatus.UNAUTHORIZED };
    res.status(httpStatus.UNAUTHORIZED).json(error);
    next(error);
    return;
  }
  if (config) {
    const isInRole = await httpContext.user.isInRole(config.role);
    if (!isInRole) {
      const error = { status: httpStatus.UNAUTHORIZED };
      res.status(httpStatus.UNAUTHORIZED).json(error);
      next({ error }); // TODO ADD ERROR HANDLERS
      return;
    }
  }
  next();
};

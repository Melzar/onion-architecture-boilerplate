import * as express from 'express';
import httpStatus from 'http-status';

import { getCurrentUser } from 'ui/config/auth/utils/getHttpContext';

export const isAuthenticated = (config?: { role: string }) => async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
): Promise<void> => {
  const user = getCurrentUser(req);

  // TODO SIMPLIFY IT
  if (!user) {
    const error = { status: httpStatus.UNAUTHORIZED };
    res.status(httpStatus.UNAUTHORIZED).json(error);
    next(error);
    return;
  }

  const isAuthenticatedUser = await user.isAuthenticated();

  if (!isAuthenticatedUser) {
    const error = { status: httpStatus.UNAUTHORIZED };
    res.status(httpStatus.UNAUTHORIZED).json(error);
    next(error);
    return;
  }
  if (config) {
    const isInRole = await user.isInRole(config.role);
    if (!isInRole) {
      const error = { status: httpStatus.UNAUTHORIZED };
      res.status(httpStatus.UNAUTHORIZED).json(error);
      next({ error }); // TODO ADD ERROR HANDLERS
      return;
    }
  }
  next();
};

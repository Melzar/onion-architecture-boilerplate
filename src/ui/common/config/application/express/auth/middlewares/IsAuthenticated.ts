import * as express from 'express';

import { FORBIDDEN, getStatusText, UNAUTHORIZED } from 'http-status-codes';

import { getCurrentUser } from 'ui/common/config/application/express/auth/utils/getHttpContext';
import { UserInterfaceError } from 'ui/common/config/errors/UserInterfaceError';

export const isAuthenticated = (config?: { role: string }) => async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
): Promise<void> => {
  const user = getCurrentUser(req);

  if (!user) {
    next(
      new UserInterfaceError(
        UNAUTHORIZED,
        getStatusText(UNAUTHORIZED).toUpperCase()
      )
    );
    return;
  }

  const isAuthenticatedUser = await user.isAuthenticated();

  if (!isAuthenticatedUser) {
    next(
      new UserInterfaceError(
        UNAUTHORIZED,
        getStatusText(UNAUTHORIZED).toUpperCase()
      )
    );
    return;
  }
  if (config) {
    const isInRole = await user.isInRole(config.role);
    if (!isInRole) {
      next(
        new UserInterfaceError(
          FORBIDDEN,
          getStatusText(FORBIDDEN).toUpperCase()
        )
      );
      return;
    }
  }
  next();
};

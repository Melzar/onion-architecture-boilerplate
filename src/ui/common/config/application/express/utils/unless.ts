import { NextFunction, Request, Response } from 'express';

// SOURCE: https://stackoverflow.com/a/51981393
export const unless = (path: string, middleware: any) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (path === req.path) {
      return next();
    }
    return middleware(req, res, next);
  };
};

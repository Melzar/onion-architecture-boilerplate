import { Request } from 'express';

import { Context } from 'ui/common/config/application/apollo/types/Context';

export interface IApolloContext {
  context: ({ req }: { req: Request }) => Promise<Context>;
}

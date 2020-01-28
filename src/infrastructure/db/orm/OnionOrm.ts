import { injectable } from 'inversify';
import { createConnections } from 'typeorm';

import { BaseOrm } from 'infrastructure/db/orm/BaseOrm';

@injectable()
export class OnionOrm extends BaseOrm {
  public async initialize(): Promise<void> {
    await createConnections().then(
      async () => {
        // TODO PERFORM OPERATIONS ON SUCCESS
      },
      () => {
        // TODO PERFORM OPERATIONS ON ERROR
        // console.log(error);
      }
    );
  }
}

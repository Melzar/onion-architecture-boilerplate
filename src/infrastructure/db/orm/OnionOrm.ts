import { injectable } from 'inversify';
import { createConnection } from 'typeorm';

import { BaseOrm } from 'infrastructure/db/orm/BaseOrm';

@injectable()
export class OnionOrm extends BaseOrm {
  public initialize(): void {
    createConnection().then(async () => {
      // TODO PERFORM OPERATIONS ON SUCCESS
    }, () => {
      // TODO PERFORM OPERATIONS ON ERROR
      // console.log(error);
    });
  }
}

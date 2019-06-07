import { injectable } from 'inversify';
import { Connection, createConnection } from 'typeorm';

import { BaseOrm } from 'infrastructure/db/orm/BaseOrm';

@injectable()
export class OnionOrm extends BaseOrm {
  public initialize(): void {
    createConnection().then(async (connection: Connection) => {
      // TODO PERFORM OPERATIONS ON SUCCESS
    }, (error) => {
      // TODO PERFORM OPERATIONS ON ERROR
      console.log(error);
    });
  }
}

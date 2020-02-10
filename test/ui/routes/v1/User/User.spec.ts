import { Connection } from 'typeorm';
import { Application } from 'express';
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';

import { runSeeder } from 'typeorm-seeding';

import httpStatus from 'http-status';

import sinon from 'sinon';

import { prepareTestApp } from 'config/helpers/prepareTestApp';
import { prepareTestDB } from 'config/helpers/prepareTestDB';
import { AuthenticationSeed } from 'config/seeds/AuthenticationSeed';
import { clearTestDB } from 'config/helpers/clearTestDB';
import { UserSeed } from 'config/seeds/UserSeed';
import { inTransaction } from 'config/helpers/inTransaction';
import { prepareAuthenticationToken } from 'config/helpers/prepareAuthenticationToken';
import { mockRepositoryConnectionName } from 'config/mocks/mockRepositoryConnectionName';

import { User } from 'infrastructure/db/entities/User';

chai.use(chaiHttp);

describe('/v1/user', () => {
  let connection: Connection;
  let expressApplication: Application;
  let testName: string | undefined;

  before(async function before() {
    testName = this.test?.parent?.title;
    expressApplication = await prepareTestApp();
    connection = await prepareTestDB(testName);
    await runSeeder(AuthenticationSeed);
    await runSeeder(UserSeed);
    mockRepositoryConnectionName(testName);
  });

  after(async function after() {
    sinon.restore();
    await clearTestDB(testName);
  });

  it(
    'DELETE 200 OK, return object with status OK, when user has been deleted',
    inTransaction(async () => {
      const token = await prepareAuthenticationToken(
        'onion_member_test@example.com',
        testName
      );

      const user = await connection.getRepository<User>(User).findOneOrFail({
        where: {
          email: 'onion_member_test_delete@example.com',
        },
      });

      const response = await chai
        .request(expressApplication)
        .delete('/v1/user')
        .set('Authorization', `Bearer ${token}`)
        .send({
          id: user.id,
        });

      expect(response.status).to.eql(httpStatus.OK);

      const userDeleted = await connection.getRepository<User>(User).findOne({
        where: {
          email: 'onion_member_test_delete@example.com',
        },
      });

      expect(userDeleted).to.eql(undefined);
    })
  );
});
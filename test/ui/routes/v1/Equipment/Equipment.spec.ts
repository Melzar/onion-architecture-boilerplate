import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';

import { Connection } from 'typeorm';

import { Application } from 'express';

import { runSeeder } from 'typeorm-seeding';

import sinon from 'sinon';

import { FORBIDDEN, OK, UNAUTHORIZED } from 'http-status-codes';

import { inTransaction } from 'config/helpers/inTransaction';

import { prepareTestDB } from 'config/helpers/prepareTestDB';
import { prepareTestApp } from 'config/helpers/prepareTestApp';
import { prepareAuthenticationToken } from 'config/helpers/prepareAuthenticationToken';
import { AuthenticationSeed } from 'config/seeds/AuthenticationSeed';
import { clearTestDB } from 'config/helpers/clearTestDB';
import { mockRepositoryConnectionName } from 'config/mocks/mockRepositoryConnectionName';

import { Equipment } from 'infrastructure/database/entities/Equipment';

import { TransactionConnectionName } from 'config/db/TransactionCreator';

chai.use(chaiHttp);

describe('/v1/equipment', () => {
  let connection: Connection;
  let expressApplication: Application;
  let testName: string;

  before(async function before() {
    testName = this.test?.parent?.title || '';
    expressApplication = await prepareTestApp();
    connection = await prepareTestDB(testName);
    await runSeeder(AuthenticationSeed);
    mockRepositoryConnectionName(testName);
    sinon.stub(TransactionConnectionName, 'connectionName').returns(testName);
  });

  after(async function after() {
    sinon.restore();
    await clearTestDB(testName);
  });

  it(
    'POST 200 OK, return object with status OK, when equipment has been created',
    inTransaction(async () => {
      const token = await prepareAuthenticationToken(
        'onion_member_test@example.com',
        testName
      );

      const response = await chai
        .request(expressApplication)
        .post('/v1/equipment')
        .set('Authorization', `Bearer ${token}`)
        .send({
          name: 'test equipment',
        });

      expect(response.status).to.eql(OK);

      const equipment = await connection
        .getRepository<Equipment>(Equipment)
        .findOneOrFail({
          where: {
            name: 'test equipment',
          },
        });

      expect(equipment.name).to.eql('test equipment');
    })
  );

  it(
    'POST 401 UNAUTHORIZED, return generic object with code UNAUTHORIZED, when user is unauthorized',
    inTransaction(async () => {
      const response = await chai
        .request(expressApplication)
        .post('/v1/equipment')
        .send({
          name: 'test equipment',
        });

      expect(response.status).to.eql(UNAUTHORIZED);
      expect(response.body).to.deep.equal({
        code: 'UNAUTHORIZED',
        message: '',
      });
    })
  );

  it(
    'POST 403 FORBIDDEN, return generic object with code FORBIDDEN, when user is authorized but with not required role',
    inTransaction(async () => {
      const token = await prepareAuthenticationToken(
        'onion_admin_test@example.com',
        testName
      );

      const response = await chai
        .request(expressApplication)
        .post('/v1/equipment')
        .set('Authorization', `Bearer ${token}`)
        .send({
          name: 'test equipment admin',
        });

      expect(response.status).to.eql(FORBIDDEN);

      const equipment = await connection
        .getRepository<Equipment>(Equipment)
        .findOne({
          where: {
            name: 'test equipment',
          },
        });

      expect(equipment).to.eql(undefined);
    })
  );
});

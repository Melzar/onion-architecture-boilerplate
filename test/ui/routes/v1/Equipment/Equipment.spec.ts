import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';

import { Connection } from 'typeorm';

import { Application } from 'express';

import { runSeeder } from 'typeorm-seeding';

import httpStatus from 'http-status';

import sinon from 'sinon';

import { inTransaction } from 'config/helpers/inTransaction';

import { prepareTestDB } from 'config/helpers/prepareTestDB';
import { prepareTestApp } from 'config/helpers/prepareTestApp';
import { prepareAuthenticationToken } from 'config/helpers/prepareAuthenticationToken';
import { AuthenticationSeed } from 'config/seeds/AuthenticationSeed';
import { clearTestDB } from 'config/helpers/clearTestDB';
import { mockRepositoryConnectionName } from 'config/mocks/mockRepositoryConnectionName';

import { Equipment } from 'infrastructure/db/entities/Equipment';

chai.use(chaiHttp);

describe('/v1/equipment', () => {
  let connection: Connection;
  let expressApplication: Application;
  let testName: string | undefined;

  before(async function before() {
    testName = this.test?.parent?.title;
    expressApplication = await prepareTestApp();
    connection = await prepareTestDB(testName);
    await runSeeder(AuthenticationSeed);
    mockRepositoryConnectionName(testName);
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

      expect(response.status).to.eql(httpStatus.OK);

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
});

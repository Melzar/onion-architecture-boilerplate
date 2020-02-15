import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';

import { runSeeder } from 'typeorm-seeding';

import { Connection } from 'typeorm';

import { Application } from 'express';

import sinon from 'sinon';

import { OK, UNAUTHORIZED } from 'http-status-codes';

import { inTransaction } from 'config/helpers/inTransaction';
import { AuthenticationSeed } from 'config/seeds/AuthenticationSeed';
import { prepareTestDB } from 'config/helpers/prepareTestDB';
import { prepareTestApp } from 'config/helpers/prepareTestApp';
import { clearTestDB } from 'config/helpers/clearTestDB';
import { mockRepositoryConnectionName } from 'config/mocks/mockRepositoryConnectionName';

import { User } from 'infrastructure/database/entities/User';

import { TransactionConnectionName } from 'config/db/TransactionCreator';

chai.use(chaiHttp);

describe('/v1/auth', () => {
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
    'POST 200 OK, return object with status OK, when user has been created',
    inTransaction(async () => {
      const response = await chai
        .request(expressApplication)
        .post('/v1/auth/signup')
        .send({
          email: 'onion_test@example.com',
          password: 'onion_test_123',
          lastName: 'test last name',
          firstName: 'test first name',
          age: 10,
        });

      const {
        id,
        email,
        lastName,
        firstName,
        age,
      } = await connection.getRepository<User>(User).findOneOrFail({
        where: {
          email: 'onion_test@example.com',
        },
      });

      expect(email).to.eql('onion_test@example.com');
      expect(lastName).to.eql('test last name');
      expect(firstName).to.eql('test first name');
      expect(age).to.eql(10);

      expect(response.status).to.eql(OK);
      expect(response.body).to.deep.equal({
        id,
        email: 'onion_test@example.com',
        password: 'onion_test_123',
        lastName: 'test last name',
        firstName: 'test first name',
        age: 10,
      });
    })
  );

  it(
    'POST 200 OK, return object with status OK, when credentials are correct',
    inTransaction(async () => {
      const response = await chai
        .request(expressApplication)
        .post('/v1/auth')
        .send({
          email: 'onion_member_test@example.com',
          password: 'onion_test_123',
        });
      expect(response.status).to.eql(OK);
      expect(response.body).to.have.property('token');
    })
  );

  it(
    'POST 401 UNAUTHORIZED, return object with UNAUTHORIZED code, when credentials are incorrect',
    inTransaction(async () => {
      const response = await chai
        .request(expressApplication)
        .post('/v1/auth')
        .send({
          email: 'onion_member_nonexist@example.com',
          password: 'onion_test_123',
        });
      expect(response.status).to.eql(UNAUTHORIZED);
      expect(response.body).to.deep.equal({
        code: 'UNAUTHORIZED',
        message: '',
      });
    })
  );
});

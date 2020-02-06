import chai, { expect } from 'chai';
import httpStatus from 'http-status';
import chaiHttp from 'chai-http';

import { runSeeder } from 'typeorm-seeding';

import { Application } from 'express';

import { Connection } from 'typeorm';

import { prepareTestApp } from 'config/helpers/prepareTestApp';
import { inTransaction } from 'config/helpers/inTransaction';
import { AuthenticationSeed } from 'config/seeds/AuthenticationSeed';
import { prepareTestDB } from 'config/helpers/prepareTestDB';

import { User } from 'infrastructure/db/entities/User';

chai.use(chaiHttp);

describe('/v1/auth requests', () => {
  let expressApplication: Application;
  let connection: Connection;

  before(async () => {
    expressApplication = await prepareTestApp();
    connection = await prepareTestDB();
    await runSeeder(AuthenticationSeed);
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

      const user = await connection.getRepository<User>(User).findOne({
        where: {
          email: 'onion_test@example.com',
        },
      });

      expect(user).to.not.eql(null);
      expect(user?.email).to.eql('onion_test@example.com');
      expect(user?.lastName).to.eql('test last name');
      expect(user?.firstName).to.eql('test first name');
      expect(user?.age).to.eql(10);

      expect(response.status).to.eql(httpStatus.OK);
      expect(response.body).to.deep.equal({ status: 'OK' });
    })
  );

  it(
    'DELETE 200 OK, return object with status OK, when user logout',
    inTransaction(async () => {
      const response = await chai
        .request(expressApplication)
        .delete('/v1/auth/logout')
        .set(
          'Authorization',
          'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxLCJmaXJzdE5hbWUiOiJEZXN0aW55IiwiZW1haWwiOiJvbmlvbl9tZW1iZXJfdGVzdEBleGFtcGxlLmNvbSIsInJvbGUiOiJtZW1iZXIiLCJsYXN0TmFtZSI6IkJhcnRlbGwiLCJwYXNzd29yZCI6IiQyYiQxMCQ1TEZnOXVpTVVHQVZlY1JtTlVuSFhlUmhQdWlHSTZVMktPLzBmZnViRG5HMlIvamVCM2g0dSIsImFnZSI6ODB9LCJpYXQiOjE1ODA5OTkyOTQsImV4cCI6MTU4MTAwNjQ5NH0.ifbJt7lq6pgzwYYc4sJKDLOaxNUBkNLahYlBC7GPX88'
        );

      expect(response.status).to.eql(httpStatus.OK);
      expect(response.body).to.deep.equal({ status: 'OK' });
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
      expect(response.status).to.eql(httpStatus.OK);
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
      expect(response.status).to.eql(httpStatus.UNAUTHORIZED);
      expect(response.body).to.deep.equal({
        code: 'UNAUTHORIZED_CODE',
        message: '',
      });
    })
  );
});

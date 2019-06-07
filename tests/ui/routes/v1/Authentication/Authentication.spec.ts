import chai, { expect } from 'chai';
import httpStatus from 'http-status';
import chaiHttp from 'chai-http';

import { App } from 'ui/config/application/ExpressApplication';

chai.use(chaiHttp);

describe('api/v1/auth requests', () => {
  before(async () => {
    App.initialize(); // TODO I WOULD CONSIDER HAVING TEST APP INSTANCE OR OVERRIDING IT
  });

  it('POST 200 OK, return object with status OK', async () => {
    const response = await chai.request(App.getApplication()).post('/api/v1/auth');
    expect(response.status).to.eql(httpStatus.OK);
    expect(response.body).to.deep.equal({ status: 'OK' });
  });
});

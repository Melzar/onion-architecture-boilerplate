import sinon from 'sinon';

export const mockRepositoryConnectionName = (testName?: string) => {
  sinon.stub(process.env, 'ORM_CONNECTION').value(testName);
};

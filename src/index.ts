import 'reflect-metadata';

import { InversifyExpressServer } from 'inversify-express-utils';

import { ExpressApplication } from 'ui/config/application/ExpressApplication';
import { PORT } from 'ui/config/consts/variables';
import { OnionOrm } from 'infrastructure/db/orm/OnionOrm';
import { AppContainer } from 'dependency/AppContainer';
import { DATABASE_IDENTIFIERS } from 'infrastructure/InfrastructureModuleSymbols';
import { APPLICATION_IDENTIFIERS } from 'ui/UiModuleSymbols';

(async () => {
  const appContainer = new AppContainer();
  appContainer.init();
  appContainer
    .get<ExpressApplication>(APPLICATION_IDENTIFIERS.EXPRESS_APPLICATION)
    .initialize();
  await appContainer.get<OnionOrm>(DATABASE_IDENTIFIERS.ORM).initialize();
  appContainer
    .get<InversifyExpressServer>(APPLICATION_IDENTIFIERS.INVERSIFY_APPLICATION)
    .build()
    // eslint-disable-next-line no-console
    .listen(PORT, () => console.log(`Server listening on ${PORT}`));
})();

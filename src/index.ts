import 'reflect-metadata';

import { InversifyExpressServer } from 'inversify-express-utils';

import { AppContainer } from 'dependency/AppContainer';

import { ExpressApplication } from 'ui/common/config/application/express/ExpressApplication';
import { ApolloApplication } from 'ui/common/config/application/apollo/ApolloApplication';
import { UI_APPLICATION_IDENTIFIERS } from 'ui/UiModuleSymbols';
import { DATABASE_IDENTIFIERS } from 'infrastructure/InfrastructureModuleSymbols';
import { PORT } from 'ui/common/config/consts/variables';
import { IOrm } from 'infrastructure/database/orm/IOrm';

(async () => {
  const appContainer = new AppContainer();
  appContainer.init();
  appContainer
    .get<ExpressApplication>(UI_APPLICATION_IDENTIFIERS.EXPRESS_APPLICATION)
    .initialize();
  appContainer
    .get<ApolloApplication>(UI_APPLICATION_IDENTIFIERS.APOLLO_APPLICATION)
    .initialize();
  await appContainer.get<IOrm>(DATABASE_IDENTIFIERS.ORM).initialize();
  appContainer
    .get<InversifyExpressServer>(
      UI_APPLICATION_IDENTIFIERS.INVERSIFY_APPLICATION
    )
    .build()
    // eslint-disable-next-line no-console
    .listen(PORT, () => console.log(`Server listening on ${PORT}`));
})();

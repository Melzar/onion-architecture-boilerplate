import 'reflect-metadata';

import { InversifyExpressServer } from 'inversify-express-utils';

import { AppContainer } from 'dependency/AppContainer';

import { ExpressApplication } from 'ui/config/application/ExpressApplication';
import { UI_APPLICATION_IDENTIFIERS } from 'ui/UiModuleSymbols';
import { DATABASE_IDENTIFIERS } from 'infrastructure/InfrastructureModuleSymbols';
import { PORT } from 'ui/config/consts/variables';
import { IOrm } from 'infrastructure/database/orm/IOrm';

(async () => {
  const appContainer = new AppContainer();
  appContainer.init();
  appContainer
    .get<ExpressApplication>(UI_APPLICATION_IDENTIFIERS.EXPRESS_APPLICATION)
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

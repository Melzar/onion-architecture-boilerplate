import { InversifyExpressServer } from 'inversify-express-utils';

import { Application } from 'express';

import { ExpressApplication } from 'ui/common/config/application/express/ExpressApplication';

import { AppContainer } from 'dependency/AppContainer';

import { UI_APPLICATION_IDENTIFIERS } from 'ui/UiModuleSymbols';

export const prepareTestApp = async (): Promise<Application> => {
  const container = new AppContainer();

  container.init();

  container
    .get<ExpressApplication>(UI_APPLICATION_IDENTIFIERS.EXPRESS_APPLICATION)
    .initialize();

  return container
    .get<InversifyExpressServer>(
      UI_APPLICATION_IDENTIFIERS.INVERSIFY_APPLICATION
    )
    .build();
};

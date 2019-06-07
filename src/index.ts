import 'reflect-metadata';

import { ExpressApplication } from 'ui/config/application/ExpressApplication';
import { PORT } from 'ui/config/consts/variables';
import { OnionOrm } from 'infrastructure/db/orm/OnionOrm';
import { AppContainer } from 'dependency/App/AppContainer';
import { DATABASE_IDENTIFIERS } from 'dependency/common/DatabaseModule';
import { APPLICATION_IDENTIFIERS } from 'dependency/common/ApplicationModuleSymbols';

const app = new AppContainer();
app.init();

const App = app.get<ExpressApplication>(APPLICATION_IDENTIFIERS.EXPRESS_APPLICATION);
App.initialize();

app.get<OnionOrm>(DATABASE_IDENTIFIERS.ORM).initialize();

App.getApplication().listen(PORT, () => console.log(`Server listening on ${PORT}`));

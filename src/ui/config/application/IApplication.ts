export interface IApplication {
  /**
   * Security
   * @Description Apply security related plugins like JWT, request security etc...
   */
  initializeSecurity(): void;

  /**
   * Body Parsers
   * @Description Apply request related body parsers
   */
  initializeBodyParsers(): void;
  /**
   * Loggers
   * @Description Apply here application wide loggers
   */
  initializeLogging(): void;

  /**
   * Routes
   * @Description Apply here application routes definition
   */
  initializeRoutes(): void;

  /**
   * Handlers
   * @Description Apply here application handlers
   */
  initializeHandlers(): void;

  /**
   * Plugins
   * @Description Apply here any external plugins for app
   */
  initializePlugins(): void;
}

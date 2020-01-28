import { ContainerModule, interfaces } from 'inversify';

export abstract class BaseModule extends ContainerModule {
  public abstract init(bind: interfaces.Bind): void;
}

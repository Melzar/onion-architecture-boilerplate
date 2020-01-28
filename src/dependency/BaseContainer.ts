import { Container } from 'inversify';

export abstract class BaseContainer extends Container {
  public abstract init(): void;
}

export interface IInteractor<A, R> {
  execute(...args: A[]): Promise<R> | R;
}

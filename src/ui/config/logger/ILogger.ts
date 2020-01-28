export interface ILogger {
  write(message: string): void;

  initialize(): void;
}

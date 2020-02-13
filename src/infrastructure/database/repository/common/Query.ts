export type Query<T> = {
  [P in keyof T]?: T[P];
};

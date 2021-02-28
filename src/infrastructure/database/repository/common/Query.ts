export type Query<T> = {
  [P in keyof T]?: T[P] extends never ? Query<T[P]> : Query<T[P]>;
};

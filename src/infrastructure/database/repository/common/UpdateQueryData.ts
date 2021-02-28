export type UpdateQueryData<T> = {
  [P in keyof T]?:
    | (T[P] extends Array<infer U>
        ? Array<UpdateQueryData<U>>
        : T[P] extends ReadonlyArray<infer U>
        ? ReadonlyArray<UpdateQueryData<U>>
        : UpdateQueryData<T[P]>)
    | (() => string);
};

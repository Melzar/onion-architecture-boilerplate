export type Context = {
  viewer?: {
    id: number;
    name: string;
    type?: string;
    email: string;
  };
  claims?: {
    role: string;
  };
};

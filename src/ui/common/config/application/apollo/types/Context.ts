export type Context = {
  viewer?: {
    id: string;
    name: string;
    type?: string;
    email: string;
  };
  claims?: {
    role: string;
  };
};

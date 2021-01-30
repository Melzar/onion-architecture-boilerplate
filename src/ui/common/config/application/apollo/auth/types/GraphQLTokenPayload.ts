export type GraphQLTokenPayload = {
  claims?: {
    role: string;
  };
  viewer: {
    id: number;
    name: string;
    email: string;
    type?: string;
  };
};

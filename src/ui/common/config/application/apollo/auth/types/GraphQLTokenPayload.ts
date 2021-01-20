export type GraphQLTokenPayload = {
  claims?: {
    role: string;
  };
  viewer: {
    id: string;
    name: string;
    email: string;
    type?: string;
  };
};

import * as dotenv from 'dotenv';

dotenv.config();

export const PORT = process.env.PORT || '3000';

export const LOG_LEVEL = process.env.LOG_LEVEL || 'debug';

export const { SWAGGER_HOST } = process.env;

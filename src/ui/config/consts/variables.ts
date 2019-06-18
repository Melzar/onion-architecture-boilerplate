import * as dotenv from 'dotenv';

dotenv.config();

export const APP_TOKEN_SECRET = process.env.APP_TOKEN_SECRET || '';
export const APP_TOKEN_LIFE = process.env.APP_TOKEN_LIFE || '24h';
export const PORT = process.env.PORT || '3000';
export const LOG_LEVEL = process.env.LOG_LEVEL || 'debug';
export const { SWAGGER_HOST } = process.env;

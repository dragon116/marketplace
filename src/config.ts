import * as dotenv from 'dotenv';
import * as path from 'path';

export const config = () => {
  // Environment Variables
  if (process.env.ENV_CONFIG_STATUS === 'configured') {
    return;
  }
  let envFilePath: string;
  switch (process.env.NODE_ENV) {
    case 'test':
      envFilePath = `${__dirname}/.env.test`;
      break;
    case 'production':
      envFilePath = `${__dirname}/.env.production`;
      break;
    case 'development':
      envFilePath = `${__dirname}/.env.development`;
      break;
    default:
      envFilePath = `${__dirname}/.env.development`;
      break;
  }
  dotenv.config({ path: path.resolve(envFilePath) });
};

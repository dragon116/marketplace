import * as path from 'path';
import { config } from './config';

config();

const BASE_PATH = path.join(__dirname, 'db');

module.exports = {
  test: {
    client: 'pg',
    connection: `postgres://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${
      process.env.DB_SERVER
    }:${process.env.DB_PORT}/${process.env.DATABASE}`,
    migrations: {
      directory: path.join(BASE_PATH, 'migrations'),
    },
    seeds: {
      directory: path.join(BASE_PATH, 'seeds'),
    },
  },
  development: {
    client: 'pg',
    connection: `postgres://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${
      process.env.DB_SERVER
    }:${process.env.DB_PORT}/${process.env.DATABASE}`,
    migrations: {
      directory: path.join(BASE_PATH, 'migrations'),
    },
    seeds: {
      directory: path.join(BASE_PATH, 'seeds'),
    },
  },
};

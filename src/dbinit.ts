import * as Knex from 'knex';
import { config } from './config';
import { exec } from 'child_process';

// Load environment variables
config();

// Create Database
const conn: any = {
  host: 'localhost',
  port: '5432',
  user: 'postgres',
  password: '123',
  database: 'test',
  charset: 'utf8',
};

const knex = Knex({ client: 'pg', connection: conn });
knex.raw(`CREATE DATABASE ${process.env.DATABASE}`).then(() => {
  knex.destroy();
});

// Run migrations and seeds
exec(`npx knex migrate:latest`);
exec(`npx knex seed:run --specific=users_roles_seed.ts`);
exec(`npx knex seed:run --specific=users_seed.ts`);
exec(`npx knex seed:run --specific=influencers_seed.ts`);
exec(`npx knex seed:run --specific=marketers_seed.ts`);
exec(`npx knex seed:run --specific=watchers_seed.ts`);
exec(`npx knex seed:run --specific=messages_seed.ts`);

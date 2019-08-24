import * as Knex from 'knex';

exports.up = (knex: Knex) => up(knex);
exports.down = (knex: Knex) => down(knex);

function up(knex: Knex) {
  return knex.schema.createTable('users', (table) => {
    table.increments();
    table
      .string('email')
      .notNullable()
      .unique();
    table.string('password').notNullable();
    table
      .integer('role')
      .notNullable()
      .defaultTo(0);
    table.string('avatar');
    table.text('alt');
    table
      .integer('live')
      .notNullable()
      .defaultTo(1);
  });
}

function down(knex: Knex) {
  return knex.schema.dropTable('users');
}

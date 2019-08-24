import * as Knex from 'knex';

exports.up = (knex: Knex) => up(knex);
exports.down = (knex: Knex) => down(knex);

function up(knex: Knex) {
  return knex.schema.createTable('user_roles', (table) => {
    table.increments();
    table
      .string('name')
      .notNullable()
      .unique();
  });
}

function down(knex: Knex) {
  return knex.schema.dropTable('user_roles');
}

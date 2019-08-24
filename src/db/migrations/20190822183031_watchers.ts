import * as Knex from 'knex';

exports.up = (knex: Knex) => up(knex);
exports.down = (knex: Knex) => down(knex);

function up(knex: Knex) {
  return knex.schema.createTable('watchers', (table) => {
    table.increments();
    table.integer('userid').notNullable();
    table.foreign('userid').references('users.id');
    table.string('name');
    table.string('surname');
    table.integer('owner').notNullable();
  });
}

function down(knex: Knex) {
  return knex.schema.dropTable('watchers');
}

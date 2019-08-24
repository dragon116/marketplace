import * as Knex from 'knex';

exports.up = (knex: Knex) => up(knex);
exports.down = (knex: Knex) => down(knex);

function up(knex: Knex) {
  return knex.schema.createTable('messages', (table) => {
    table.increments();
    table.integer('from').notNullable();
    table.foreign('from').references('users.id');
    table.integer('to');
    table.text('message');
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now());
    table.timestamp('deleted_at');
    table.boolean('del_flag').defaultTo(false);
  });
}

function down(knex: Knex) {
  return knex.schema.dropTable('messages');
}

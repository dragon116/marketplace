import * as Knex from 'knex';

exports.up = (knex: Knex) => up(knex);
exports.down = (knex: Knex) => down(knex);

function up(knex: Knex) {
  return knex.schema.createTable('influencers', (table) => {
    table.increments();
    table.integer('userid').notNullable();
    table.foreign('userid').references('users.id');
    table.string('name').notNullable();
    table.string('surname').notNullable();
    table.string('birthday').notNullable();
    table.string('gender').notNullable();
  });
}

function down(knex: Knex) {
  return knex.schema.dropTable('influencers');
}

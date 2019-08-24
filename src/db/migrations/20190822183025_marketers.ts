import * as Knex from 'knex';

exports.up = (knex: Knex) => up(knex);
exports.down = (knex: Knex) => down(knex);

function up(knex: Knex) {
  return knex.schema.createTable('marketers', (table) => {
    table.increments();
    table.integer('userid').notNullable();
    table.foreign('userid').references('users.id');
    table.string('name').notNullable();
    table.string('surname').notNullable();
    table.string('job_description');
    table.string('phone_number');
    table.integer('owner').notNullable();
  });
}

function down(knex: Knex) {
  return knex.schema.dropTable('marketers');
}

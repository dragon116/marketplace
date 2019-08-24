"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.up = (knex) => up(knex);
exports.down = (knex) => down(knex);
function up(knex) {
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
function down(knex) {
    return knex.schema.dropTable('messages');
}

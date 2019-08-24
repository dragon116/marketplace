"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.up = (knex) => up(knex);
exports.down = (knex) => down(knex);
function up(knex) {
    return knex.schema.createTable('watchers', (table) => {
        table.increments();
        table.integer('userid').notNullable();
        table.foreign('userid').references('users.id');
        table.string('name');
        table.string('surname');
        table.integer('owner').notNullable();
    });
}
function down(knex) {
    return knex.schema.dropTable('watchers');
}

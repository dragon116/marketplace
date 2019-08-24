"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.up = (knex) => up(knex);
exports.down = (knex) => down(knex);
function up(knex) {
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
function down(knex) {
    return knex.schema.dropTable('users');
}

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.up = (knex) => up(knex);
exports.down = (knex) => down(knex);
function up(knex) {
    return knex.schema.createTable('user_roles', (table) => {
        table.increments();
        table
            .string('name')
            .notNullable()
            .unique();
    });
}
function down(knex) {
    return knex.schema.dropTable('user_roles');
}

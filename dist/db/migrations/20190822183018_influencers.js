"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.up = (knex) => up(knex);
exports.down = (knex) => down(knex);
function up(knex) {
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
function down(knex) {
    return knex.schema.dropTable('influencers');
}

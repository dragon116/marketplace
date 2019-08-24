"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.up = (knex) => up(knex);
exports.down = (knex) => down(knex);
function up(knex) {
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
function down(knex) {
    return knex.schema.dropTable('marketers');
}

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const knex = require("knex");
class Connection {
    knex() {
        return knex(exportConfig());
    }
}
exports.Connection = Connection;
function exportConfig() {
    const environment = process.env.NODE_ENV || 'development';
    return require('../knexfile')[environment];
}

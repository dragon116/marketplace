"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const connection_1 = require("../connection");
class UsersService {
    constructor() {
        this.connector = new connection_1.Connection().knex();
    }
    getUsers() {
        return this.connector('users').select('*');
    }
    getSingleUser(entityId) {
        return this.connector('users')
            .first('*')
            .where({ id: entityId });
    }
    insert(user) {
        return this.connector('users').insert(user);
    }
    update(id, user) {
        return this.connector('users')
            .where({ id })
            .update(user);
    }
    delete(id) {
        return this.connector('users')
            .where({ id })
            .del();
    }
}
exports.UsersService = UsersService;

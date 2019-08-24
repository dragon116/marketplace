"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const connection_1 = require("../connection");
class UserRoleService {
    constructor() {
        this.connector = new connection_1.Connection().knex();
    }
    getUserRoles() {
        return this.connector('user_roles').select('*');
    }
    getSingleUserRole(entityId) {
        return this.connector('user_roles')
            .first('*')
            .where({ id: entityId });
    }
    insert(userRole) {
        return this.connector('user_roles').insert(userRole);
    }
    update(id, userRole) {
        return this.connector('user_roles')
            .where({ id })
            .update(userRole);
    }
    delete(id) {
        return this.connector('user_roles')
            .where({ id })
            .del();
    }
}
exports.UserRoleService = UserRoleService;

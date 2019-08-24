"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const connection_1 = require("../connection");
class AuthService {
    // private table: any;
    constructor() {
        this.connector = new connection_1.Connection().knex();
        // this.table = this.connector('users');
    }
    async isExistingEmail(email) {
        const result = await this.connector('users')
            .where({ email })
            .count('*')
            .first();
        if (result.count === '0')
            return false;
        return true;
    }
    signup(userInfo) {
        return this.connector('users').insert(userInfo);
    }
    login(userInfo) {
        return this.connector('users')
            .select('*')
            .where(userInfo);
    }
    async isPasswordCorrect(userInfo) {
        const result = await this.connector('users')
            .where({ email: userInfo.email, password: userInfo.password })
            .count('*')
            .first();
        if (result.count === '0')
            return false;
        return true;
    }
    getUser(email) {
        return this.connector('users')
            .first()
            .where({ email });
    }
    signout(id) {
        return this.connector('users')
            .where({ id })
            .update({ live: 0 });
    }
}
exports.AuthService = AuthService;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const connection_1 = require("../connection");
class MarketersService {
    constructor() {
        this.connector = new connection_1.Connection().knex();
    }
    getMarketers() {
        return this.connector('marketers').select('*');
    }
    getSingleMarketer(entityId) {
        return this.connector('marketers')
            .first('*')
            .where({ id: entityId });
    }
    insert(marketer) {
        return this.connector('marketers').insert(marketer);
    }
    update(id, marketer) {
        return this.connector('marketers')
            .where({ id })
            .update(marketer);
    }
    delete(id) {
        return this.connector('marketers')
            .where({ id })
            .del();
    }
}
exports.MarketersService = MarketersService;

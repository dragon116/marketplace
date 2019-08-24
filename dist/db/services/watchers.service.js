"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const connection_1 = require("../connection");
class WatchersService {
    constructor() {
        this.connector = new connection_1.Connection().knex();
    }
    getWatchers() {
        return this.connector('watchers').select('*');
    }
    getSingleWatcher(entityId) {
        return this.connector('watchers')
            .first('*')
            .where({ id: entityId });
    }
    insert(watcher) {
        return this.connector('watchers').insert(watcher);
    }
    update(id, watcher) {
        return this.connector('watchers')
            .where({ id })
            .update(watcher);
    }
    delete(id) {
        return this.connector('watchers')
            .where({ id })
            .del();
    }
}
exports.WatchersService = WatchersService;

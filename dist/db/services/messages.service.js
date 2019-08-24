"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const connection_1 = require("../connection");
const constants = require("../../constants");
class MessagesService {
    constructor() {
        this.connector = new connection_1.Connection().knex();
        this.table = 'messages';
    }
    getMessages(params) {
        if (params.role === constants.ROLE_INFULENCER ||
            params.role === constants.ROLE_MARKETER) {
            return this.connector(this.table)
                .where({ from: params.userid })
                .orWhere({ to: params.userid })
                .select('*');
        }
        if (params.role === constants.ROLE_ACCOUNT_MANAGER) {
            return this.connector('messages')
                .join('marketers', function () {
                this.on(function () {
                    this.on('messages.from', '=', 'marketers.userid');
                    this.orOn('messages.to', '=', 'marketers.userid');
                });
            })
                .where({ owner: params.userid });
        }
    }
    getSingleMessage(entityId) {
        return this.connector(this.table)
            .first('*')
            .where({ id: entityId });
    }
    insert(message) {
        return this.connector(this.table).insert(message);
    }
    update(id, message) {
        return this.connector(this.table)
            .where({ id })
            .update(message);
    }
    delete(id) {
        return this.connector(this.table)
            .where({ id })
            .del();
    }
}
exports.MessagesService = MessagesService;

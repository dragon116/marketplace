"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Router = require("koa-router");
const messages_service_1 = require("../db/services/messages.service");
// First version
class MessagesController {
    constructor() {
        this.router = new Router();
        this.router.prefix('/api/v1');
        this.db = new messages_service_1.MessagesService();
        this.init();
    }
    init() {
        this.router.get('/messages', async (ctx) => {
            try {
                const userInfo = ctx.userInfo;
                const messages = await this.db.getMessages({
                    userid: userInfo.id,
                    role: userInfo.role,
                });
                ctx.body = {
                    status: 200,
                    data: messages,
                };
            }
            catch (err) {
                console.log(err);
                ctx.body = {
                    status: 404,
                    message: 'Request failure.',
                };
            }
        });
        this.router.get('/message/:id', async (ctx) => {
            try {
                const message = await this.db.getSingleMessage(ctx.params.id);
                ctx.body = {
                    status: 200,
                    data: message,
                };
            }
            catch (err) {
                // console.log(err);
                ctx.body = {
                    status: 404,
                    message: 'Request failure.',
                };
            }
        });
        this.router.post('/message', async (ctx) => {
            try {
                const message = ctx.request.body;
                await this.db.insert(message);
                ctx.body = {
                    status: 200,
                };
            }
            catch (err) {
                // console.log(err);
                ctx.body = {
                    status: 404,
                    message: 'Request failure.',
                };
            }
        });
        this.router.put('/message/:id', async (ctx) => {
            try {
                const id = ctx.params.id;
                const message = ctx.request.body;
                await this.db.update(id, message);
                ctx.body = {
                    status: 200,
                };
            }
            catch (err) {
                // console.log(err);
                ctx.body = {
                    status: 404,
                    message: 'Request failure.',
                };
            }
        });
        this.router.delete('/message/:id', async (ctx) => {
            try {
                const id = ctx.params.id;
                await this.db.delete(id);
                ctx.body = {
                    status: 200,
                };
            }
            catch (err) {
                // console.log(err);
                ctx.body = {
                    status: 404,
                    message: 'Request failure.',
                };
            }
        });
    }
}
exports.messagesController = new MessagesController();

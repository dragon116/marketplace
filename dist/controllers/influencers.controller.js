"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Router = require("koa-router");
const influencers_service_1 = require("../db/services/influencers.service");
// First version
class InfluencersController {
    constructor() {
        this.router = new Router();
        this.router.prefix('/api/v1');
        this.db = new influencers_service_1.InfluencersService();
        this.init();
    }
    init() {
        this.router.get('/influencers', async (ctx) => {
            try {
                const influencers = await this.db.getInfluencers();
                ctx.body = {
                    status: 200,
                    data: influencers,
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
        this.router.get('/influencer/:id', async (ctx) => {
            try {
                const influencer = await this.db.getSingleInfluencer(ctx.params.id);
                ctx.body = {
                    status: 200,
                    data: influencer,
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
        this.router.post('/influencer', async (ctx) => {
            try {
                const influencer = ctx.request.body;
                await this.db.insert(influencer);
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
        this.router.put('/influencer/:id', async (ctx) => {
            try {
                const id = ctx.params.id;
                const influencer = ctx.request.body;
                await this.db.update(id, influencer);
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
        this.router.delete('/influencer/:id', async (ctx) => {
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
exports.influencersController = new InfluencersController();

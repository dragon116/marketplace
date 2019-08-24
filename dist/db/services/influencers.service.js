"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const connection_1 = require("../connection");
class InfluencersService {
    constructor() {
        this.connector = new connection_1.Connection().knex();
    }
    getInfluencers() {
        return this.connector('influencers').select('*');
    }
    getSingleInfluencer(entityId) {
        return this.connector('influencers')
            .first('*')
            .where({ id: entityId });
    }
    insert(influencer) {
        return this.connector('influencers').insert(influencer);
    }
    update(id, influencer) {
        return this.connector('influencers')
            .where({ id })
            .update(influencer);
    }
    delete(id) {
        return this.connector('influencers')
            .where({ id })
            .del();
    }
}
exports.InfluencersService = InfluencersService;

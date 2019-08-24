import * as knex from 'knex';
import { Connection } from '../connection';

export class InfluencersService {
  private connector: knex;

  constructor() {
    this.connector = new Connection().knex();
  }

  public getInfluencers() {
    return this.connector('influencers').select('*');
  }

  public getSingleInfluencer(entityId: number) {
    return this.connector('influencers')
      .first('*')
      .where({ id: entityId });
  }

  public insert(influencer: any) {
    return this.connector('influencers').insert(influencer);
  }

  public update(id: number, influencer: any) {
    return this.connector('influencers')
      .where({ id })
      .update(influencer);
  }

  public delete(id: number) {
    return this.connector('influencers')
      .where({ id })
      .del();
  }
}

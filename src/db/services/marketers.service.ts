import * as knex from 'knex';
import { Connection } from '../connection';

export class MarketersService {
  private connector: knex;

  constructor() {
    this.connector = new Connection().knex();
  }

  public getMarketers() {
    return this.connector('marketers').select('*');
  }

  public getSingleMarketer(entityId: number) {
    return this.connector('marketers')
      .first('*')
      .where({ id: entityId });
  }

  public insert(marketer: any) {
    return this.connector('marketers').insert(marketer);
  }

  public update(id: number, marketer: any) {
    return this.connector('marketers')
      .where({ id })
      .update(marketer);
  }

  public delete(id: number) {
    return this.connector('marketers')
      .where({ id })
      .del();
  }
}

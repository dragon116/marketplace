import * as knex from 'knex';
import { Connection } from '../connection';

export class WatchersService {
  private connector: knex;

  constructor() {
    this.connector = new Connection().knex();
  }

  public getWatchers() {
    return this.connector('watchers').select('*');
  }

  public getSingleWatcher(entityId: number) {
    return this.connector('watchers')
      .first('*')
      .where({ id: entityId });
  }

  public insert(watcher: any) {
    return this.connector('watchers').insert(watcher);
  }

  public update(id: number, watcher: any) {
    return this.connector('watchers')
      .where({ id })
      .update(watcher);
  }

  public delete(id: number) {
    return this.connector('watchers')
      .where({ id })
      .del();
  }
}

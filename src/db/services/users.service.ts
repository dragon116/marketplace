import * as knex from 'knex';
import { Connection } from '../connection';

export class UsersService {
  private connector: knex;

  constructor() {
    this.connector = new Connection().knex();
  }

  public getUsers() {
    return this.connector('users').select('*');
  }

  public getSingleUser(entityId: number) {
    return this.connector('users')
      .first('*')
      .where({ id: entityId });
  }

  public insert(user: any) {
    return this.connector('users').insert(user);
  }

  public update(id: number, user: any) {
    return this.connector('users')
      .where({ id })
      .update(user);
  }

  public delete(id: number) {
    return this.connector('users')
      .where({ id })
      .del();
  }
}

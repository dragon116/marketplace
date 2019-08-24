import * as knex from 'knex';
import { Connection } from '../connection';

export class UserRoleService {
  private connector: knex;

  constructor() {
    this.connector = new Connection().knex();
  }

  public getUserRoles() {
    return this.connector('user_roles').select('*');
  }

  public getSingleUserRole(entityId: number) {
    return this.connector('user_roles')
      .first('*')
      .where({ id: entityId });
  }

  public insert(userRole: any) {
    return this.connector('user_roles').insert(userRole);
  }

  public update(id: number, userRole: any) {
    return this.connector('user_roles')
      .where({ id })
      .update(userRole);
  }

  public delete(id: number) {
    return this.connector('user_roles')
      .where({ id })
      .del();
  }
}

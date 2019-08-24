import * as knex from 'knex';
import { Connection } from '../connection';
import * as constants from '../../constants';

export class MessagesService {
  private connector: knex;
  private table: string;

  constructor() {
    this.connector = new Connection().knex();
    this.table = 'messages';
  }

  public getMessages(params: any) {
    if (
      params.role === constants.ROLE_INFULENCER ||
      params.role === constants.ROLE_MARKETER
    ) {
      return this.connector(this.table)
        .where({ from: params.userid })
        .orWhere({ to: params.userid })
        .select('*');
    }
    if (params.role === constants.ROLE_ACCOUNT_MANAGER) {
      return this.connector('messages')
        .join('marketers', function() {
          this.on(function() {
            this.on('messages.from', '=', 'marketers.userid');
            this.orOn('messages.to', '=', 'marketers.userid');
          });
        })
        .where({ owner: params.userid });
    }
  }

  public getSingleMessage(entityId: number) {
    return this.connector(this.table)
      .first('*')
      .where({ id: entityId });
  }

  public insert(message: any) {
    return this.connector(this.table).insert(message);
  }

  public update(id: number, message: any) {
    return this.connector(this.table)
      .where({ id })
      .update(message);
  }

  public delete(id: number) {
    return this.connector(this.table)
      .where({ id })
      .del();
  }
}

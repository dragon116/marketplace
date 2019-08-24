import * as knex from 'knex';
import { Connection } from '../connection';

export class AuthService {
  private connector: knex;
  // private table: any;

  constructor() {
    this.connector = new Connection().knex();
    // this.table = this.connector('users');
  }

  public async isExistingEmail(email: string): Promise<boolean> {
    const result = await this.connector('users')
      .where({ email })
      .count('*')
      .first();
    if (result.count === '0') return false;
    return true;
  }

  public signup(userInfo: any) {
    return this.connector('users').insert(userInfo);
  }

  public login(userInfo: any) {
    return this.connector('users')
      .select('*')
      .where(userInfo);
  }

  public async isPasswordCorrect(userInfo: any) {
    const result = await this.connector('users')
      .where({ email: userInfo.email, password: userInfo.password })
      .count('*')
      .first();
    if (result.count === '0') return false;
    return true;
  }

  public getUser(email: string) {
    return this.connector('users')
      .first()
      .where({ email });
  }

  public signout(id: number) {
    return this.connector('users')
      .where({ id })
      .update({ live: 0 });
  }

  // public getInfluencers() {
  //   return this.connector('influencers').select('*');
  // }
}

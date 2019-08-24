import * as Koa from 'koa';
import * as constants from '../constants';

export const watcherMiddleware = async (
  ctx: Koa.BaseContext,
  next: () => Promise<any>
) => {
  try {
    if (ctx.url.match(/\/watcher/)) {
      const role = ctx.userInfo.role;
      if (role !== constants.ROLE_MARKETER) {
        ctx.body = {
          status: 404,
          message: 'Only marketers can deal with marketer watchers profile.',
        };
      } else {
        return next();
      }
    } else {
      return next();
    }
  } catch (err) {
    console.log(err);
  }
};

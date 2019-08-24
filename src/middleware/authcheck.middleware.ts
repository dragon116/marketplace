import * as Koa from 'koa';
import * as jwt from 'jsonwebtoken';

export const authCheckMiddleware = async (
  ctx: Koa.BaseContext,
  next: () => Promise<any>
) => {
  if (ctx.url.match(/\/login/)) return next();
  try {
    const userInfo = getJWTPayload(ctx.headers.authorization);
    ctx.userInfo = userInfo;
    return next();
  } catch (err) {
    ctx.body = {
      status: 404,
      message: 'Authentication Failure.',
    };
  }
};

function getJWTPayload(token: string) {
  return jwt.verify(token, process.env.SECRET_KEY);
}

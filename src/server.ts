import * as Koa from 'koa';
import * as body from 'koa-body';
import * as path from 'path';

import { config } from './config';
import { logger } from './logging';
import { authController } from './controllers/auth.controller';
import { usersController } from './controllers/users.controller';
import { influencersController } from './controllers/influencers.controller';
import { marketersController } from './controllers/marketers.controller';
import { watchersController } from './controllers/watchers.controller';
import { messagesController } from './controllers/messages.controller';
import { authCheckMiddleware } from './middleware/authcheck.middleware';
import { watcherMiddleware } from './middleware/watcher.middleware';

config();

const app = new Koa();

app.use(
  body({
    formidable: { uploadDir: path.join(__dirname, 'tmp') },
    multipart: true,
    urlencoded: true,
  })
);

app.use(authCheckMiddleware);
app.use(watcherMiddleware);
// app.use(logger);
app
  .use(usersController.router.routes())
  .use(usersController.router.allowedMethods());
app
  .use(authController.router.routes())
  .use(authController.router.allowedMethods());
app
  .use(influencersController.router.routes())
  .use(influencersController.router.allowedMethods());
app
  .use(marketersController.router.routes())
  .use(marketersController.router.allowedMethods());
app
  .use(watchersController.router.routes())
  .use(watchersController.router.allowedMethods());
app
  .use(messagesController.router.routes())
  .use(messagesController.router.allowedMethods());

export const server = app.listen(process.env.NODE_PORT);

console.log(`Server running on port ${process.env.NODE_PORT}`);

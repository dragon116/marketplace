"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Koa = require("koa");
const body = require("koa-body");
const path = require("path");
const config_1 = require("./config");
const auth_controller_1 = require("./controllers/auth.controller");
const users_controller_1 = require("./controllers/users.controller");
const influencers_controller_1 = require("./controllers/influencers.controller");
const marketers_controller_1 = require("./controllers/marketers.controller");
const watchers_controller_1 = require("./controllers/watchers.controller");
const messages_controller_1 = require("./controllers/messages.controller");
const authcheck_middleware_1 = require("./middleware/authcheck.middleware");
const watcher_middleware_1 = require("./middleware/watcher.middleware");
config_1.config();
const app = new Koa();
app.use(body({
    formidable: { uploadDir: path.join(__dirname, 'tmp') },
    multipart: true,
    urlencoded: true,
}));
app.use(authcheck_middleware_1.authCheckMiddleware);
app.use(watcher_middleware_1.watcherMiddleware);
// app.use(logger);
app
    .use(users_controller_1.usersController.router.routes())
    .use(users_controller_1.usersController.router.allowedMethods());
app
    .use(auth_controller_1.authController.router.routes())
    .use(auth_controller_1.authController.router.allowedMethods());
app
    .use(influencers_controller_1.influencersController.router.routes())
    .use(influencers_controller_1.influencersController.router.allowedMethods());
app
    .use(marketers_controller_1.marketersController.router.routes())
    .use(marketers_controller_1.marketersController.router.allowedMethods());
app
    .use(watchers_controller_1.watchersController.router.routes())
    .use(watchers_controller_1.watchersController.router.allowedMethods());
app
    .use(messages_controller_1.messagesController.router.routes())
    .use(messages_controller_1.messagesController.router.allowedMethods());
exports.server = app.listen(process.env.NODE_PORT);
console.log(`Server running on port ${process.env.NODE_PORT}`);

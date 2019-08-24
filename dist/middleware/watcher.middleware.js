"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const constants = require("../constants");
exports.watcherMiddleware = async (ctx, next) => {
    try {
        if (ctx.url.match(/\/watcher/)) {
            const role = ctx.userInfo.role;
            if (role !== constants.ROLE_MARKETER) {
                ctx.body = {
                    status: 404,
                    message: 'Only marketers can deal with marketer watchers profile.',
                };
            }
            else {
                return next();
            }
        }
        else {
            return next();
        }
    }
    catch (err) {
        console.log(err);
    }
};

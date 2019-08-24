"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jwt = require("jsonwebtoken");
exports.authCheckMiddleware = async (ctx, next) => {
    if (ctx.url.match(/\/login/))
        return next();
    try {
        const userInfo = getJWTPayload(ctx.headers.authorization);
        ctx.userInfo = userInfo;
        return next();
    }
    catch (err) {
        ctx.body = {
            status: 404,
            message: 'Authentication Failure.',
        };
    }
};
function getJWTPayload(token) {
    return jwt.verify(token, process.env.SECRET_KEY);
}

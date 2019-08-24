"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Router = require("koa-router");
const md5 = require("md5");
const auth_service_1 = require("../db/services/auth.service");
const jwt = require("jsonwebtoken");
// First version
class AuthController {
    constructor() {
        this.router = new Router();
        this.router.prefix('/api/v1');
        this.db = new auth_service_1.AuthService();
        this.init();
    }
    init() {
        this.router.post('/signup', async (ctx) => {
            try {
                let userInfo = ctx.request.body;
                let status;
                let message;
                if (!userInfo ||
                    !userInfo.email ||
                    !userInfo.password ||
                    !userInfo.role ||
                    userInfo.role === 3) {
                    status = 403;
                    message = 'Authentication Information is not valid!';
                }
                else {
                    userInfo.password = md5(userInfo.password);
                    const isExistingEmail = await this.db.isExistingEmail(userInfo.email);
                    if (isExistingEmail) {
                        status = 404;
                        message = 'The email address has been registered already.';
                    }
                    else {
                        await this.db.signup(userInfo);
                        userInfo = await this.db.getUser(userInfo.email);
                        // userInfo -> JWT
                        ctx.body = {
                            token: jwt.sign(userInfo, process.env.SECRET_KEY),
                        };
                        status = 200;
                        message = 'Sign up success!';
                    }
                }
                ctx.body = Object.assign({}, ctx.body, { status,
                    message });
            }
            catch (err) {
                // console.log(err);
                ctx.body = {
                    status: 404,
                    message: 'Request failure.',
                };
            }
        });
        this.router.post('/login', async (ctx) => {
            try {
                let userInfo = ctx.request.body;
                let status;
                let message;
                let token;
                if (!userInfo || !userInfo.email || !userInfo.password) {
                    status = 403;
                    message = 'Login Information is not valid!';
                }
                else {
                    const isExistingEmail = await this.db.isExistingEmail(userInfo.email);
                    if (isExistingEmail) {
                        userInfo.password = md5(userInfo.password);
                        if (await this.db.isPasswordCorrect(userInfo)) {
                            userInfo = await this.db.getUser(userInfo.email);
                            status = 200;
                            message = 'Login success!';
                            // userInfo -> JWT
                            token = jwt.sign(userInfo, process.env.SECRET_KEY);
                            ctx.body = {
                                token,
                            };
                        }
                        else {
                            status = 404;
                            message = 'Password is not correct!';
                        }
                    }
                    else {
                        status = 404;
                        message = 'Unregistered Email!';
                    }
                }
                ctx.body = Object.assign({}, ctx.body, { status,
                    message });
            }
            catch (err) {
                // console.log(err);
                ctx.body = {
                    status: 404,
                    message: 'Request failure.',
                };
            }
        });
    }
}
exports.authController = new AuthController();

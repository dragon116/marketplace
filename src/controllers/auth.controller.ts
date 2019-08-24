import * as Router from 'koa-router';
import * as md5 from 'md5';
import { AuthService } from '../db/services/auth.service';
import * as jwt from 'jsonwebtoken';

// First version
class AuthController {
  public router: Router;
  public db: AuthService;

  constructor() {
    this.router = new Router();
    this.router.prefix('/api/v1');
    this.db = new AuthService();
    this.init();
  }

  private init() {
    this.router.post('/signup', async (ctx) => {
      try {
        let userInfo = ctx.request.body;
        let status!: number;
        let message!: string;

        if (
          !userInfo ||
          !userInfo.email ||
          !userInfo.password ||
          !userInfo.role ||
          userInfo.role === 3
        ) {
          status = 403;
          message = 'Authentication Information is not valid!';
        } else {
          userInfo.password = md5(userInfo.password);
          const isExistingEmail: boolean = await this.db.isExistingEmail(
            userInfo.email
          );
          if (isExistingEmail) {
            status = 404;
            message = 'The email address has been registered already.';
          } else {
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

        ctx.body = {
          ...ctx.body,
          status,
          message,
        };
      } catch (err) {
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

        let status!: number;
        let message!: string;
        let token!: string;
        if (!userInfo || !userInfo.email || !userInfo.password) {
          status = 403;
          message = 'Login Information is not valid!';
        } else {
          const isExistingEmail: boolean = await this.db.isExistingEmail(
            userInfo.email
          );
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
            } else {
              status = 404;
              message = 'Password is not correct!';
            }
          } else {
            status = 404;
            message = 'Unregistered Email!';
          }
        }

        ctx.body = {
          ...ctx.body,
          status,
          message,
        };
      } catch (err) {
        // console.log(err);
        ctx.body = {
          status: 404,
          message: 'Request failure.',
        };
      }
    });
  }
}

export const authController = new AuthController();

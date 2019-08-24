import * as Router from 'koa-router';
import { UsersService } from '../db/services/users.service';
import * as fs from 'fs';
import * as path from 'path';

// First version
class UsersController {
  public router: Router;
  public db: UsersService;

  constructor() {
    this.router = new Router();
    this.router.prefix('/api/v1');
    this.db = new UsersService();
    this.init();
  }

  private init() {
    this.router.get('/users', async (ctx) => {
      try {
        const users = await this.db.getUsers();
        ctx.body = {
          status: 200,
          data: users,
        };
      } catch (err) {
        // console.log(err);
        ctx.body = {
          status: 404,
          message: 'Request failure.',
        };
      }
    });

    this.router.get('/user/:id', async (ctx) => {
      try {
        const user = await this.db.getSingleUser(ctx.params.id);
        ctx.body = {
          status: 200,
          data: user,
        };
      } catch (err) {
        // console.log(err);
        ctx.body = {
          status: 404,
          message: 'Request failure.',
        };
      }
    });

    this.router.post('/user', async (ctx) => {
      try {
        const user = ctx.request.body;
        await this.db.insert(user);
        ctx.body = {
          status: 200,
        };
      } catch (err) {
        // console.log(err);
        ctx.body = {
          status: 404,
          message: 'Request failure.',
        };
      }
    });

    this.router.post('/user/avatar', async (ctx) => {
      try {
        const file = ctx.request.files.file;
        const alt = ctx.request.body.alt;
        let status: number;
        let message: string = '';
        let filename: string = '';
        if (file) {
          if (
            file.type !== 'image/jpeg' &&
            file.type !== 'image/png' &&
            file.type !== 'image/gif'
          ) {
            status = 404;
            message = 'File type must be JPG/PNG/GIF.';
          } else {
            let ext: string = file.name.substr(file.name.indexOf('.'));
            if (ext === file.name) ext = '';
            const userInfo = ctx.userInfo;
            filename = userInfo.id + ext;
            fs.copyFile(
              file.path,
              path.resolve(`${__dirname}/../uploads/${filename}`),
              (err) => {
                if (err) throw err;
              }
            );
            status = 200;
          }
        } else {
          status = 200;
        }

        if (status !== 404) {
          const id = ctx.userInfo.id;
          await this.db.update(id, { avatar: filename, alt });
        }

        ctx.body = {
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

    this.router.put('/user/:id', async (ctx) => {
      try {
        const id = ctx.params.id;
        const user = ctx.request.body;
        await this.db.update(id, user);
        ctx.body = {
          status: 200,
        };
      } catch (err) {
        // console.log(err);
        ctx.body = {
          status: 404,
          message: 'Request failure.',
        };
      }
    });

    this.router.delete('/user/:id', async (ctx) => {
      try {
        const id = ctx.params.id;
        await this.db.delete(id);
        ctx.body = {
          status: 200,
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

export const usersController = new UsersController();

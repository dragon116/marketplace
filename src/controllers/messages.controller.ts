import * as Router from 'koa-router';
import { MessagesService } from '../db/services/messages.service';
import * as constants from '../constants';

// First version
class MessagesController {
  public router: Router;
  public db: MessagesService;

  constructor() {
    this.router = new Router();
    this.router.prefix('/api/v1');
    this.db = new MessagesService();
    this.init();
  }

  private init() {
    this.router.get('/messages', async (ctx) => {
      try {
        const userInfo = ctx.userInfo;
        const messages = await this.db.getMessages({
          userid: userInfo.id,
          role: userInfo.role,
        });
        ctx.body = {
          status: 200,
          data: messages,
        };
      } catch (err) {
        console.log(err);
        ctx.body = {
          status: 404,
          message: 'Request failure.',
        };
      }
    });

    this.router.get('/message/:id', async (ctx) => {
      try {
        const message = await this.db.getSingleMessage(ctx.params.id);
        ctx.body = {
          status: 200,
          data: message,
        };
      } catch (err) {
        // console.log(err);
        ctx.body = {
          status: 404,
          message: 'Request failure.',
        };
      }
    });

    this.router.post('/message', async (ctx) => {
      try {
        const message = ctx.request.body;
        await this.db.insert(message);
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

    this.router.put('/message/:id', async (ctx) => {
      try {
        const id = ctx.params.id;
        const message = ctx.request.body;
        await this.db.update(id, message);
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

    this.router.delete('/message/:id', async (ctx) => {
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

export const messagesController = new MessagesController();

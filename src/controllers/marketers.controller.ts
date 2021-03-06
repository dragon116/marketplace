import * as Router from 'koa-router';
import { MarketersService } from '../db/services/marketers.service';

// First version
class MarketersController {
  public router: Router;
  public db: MarketersService;

  constructor() {
    this.router = new Router();
    this.router.prefix('/api/v1');
    this.db = new MarketersService();
    this.init();
  }

  private init() {
    this.router.get('/marketers', async (ctx) => {
      try {
        const marketers = await this.db.getMarketers();
        ctx.body = {
          status: 200,
          data: marketers,
        };
      } catch (err) {
        // console.log(err);
        ctx.body = {
          status: 404,
          message: 'Request failure.',
        };
      }
    });

    this.router.get('/marketer/:id', async (ctx) => {
      try {
        const marketer = await this.db.getSingleMarketer(ctx.params.id);
        ctx.body = {
          status: 200,
          data: marketer,
        };
      } catch (err) {
        // console.log(err);
        ctx.body = {
          status: 404,
          message: 'Request failure.',
        };
      }
    });

    this.router.post('/marketer', async (ctx) => {
      try {
        const marketer = ctx.request.body;
        await this.db.insert(marketer);
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

    this.router.put('/marketer/:id', async (ctx) => {
      try {
        const id = ctx.params.id;
        const marketer = ctx.request.body;
        await this.db.update(id, marketer);
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

    this.router.delete('/marketer/:id', async (ctx) => {
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

export const marketersController = new MarketersController();

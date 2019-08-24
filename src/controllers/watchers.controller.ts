import * as Router from 'koa-router';
import { WatchersService } from '../db/services/watchers.service';

// First version
class WatchersController {
  public router: Router;
  public db: WatchersService;

  constructor() {
    this.router = new Router();
    this.router.prefix('/api/v1');
    this.db = new WatchersService();
    this.init();
  }

  private init() {
    this.router.get('/watchers', async (ctx) => {
      try {
        const watchers = await this.db.getWatchers();
        ctx.body = {
          status: 200,
          data: watchers,
        };
      } catch (err) {
        console.log(err);
        ctx.body = {
          status: 404,
          message: 'Request failure.',
        };
      }
    });

    this.router.get('/watcher/:id', async (ctx) => {
      try {
        const watcher = await this.db.getSingleWatcher(ctx.params.id);
        ctx.body = {
          status: 200,
          data: watcher,
        };
      } catch (err) {
        // console.log(err);
        ctx.body = {
          status: 404,
          message: 'Request failure.',
        };
      }
    });

    this.router.post('/watcher', async (ctx) => {
      try {
        const watcher = ctx.request.body;
        if (!watcher || !watcher.userid || !watcher.owner) {
          ctx.body = {
            status: 403,
            message: 'Must be required userid and owner.',
          };
        } else {
          await this.db.insert(watcher);
          ctx.body = {
            status: 200,
          };
        }
      } catch (err) {
        // console.log(err);
        ctx.body = {
          status: 404,
          message: 'Request failure.',
        };
      }
    });

    this.router.put('/watcher/:id', async (ctx) => {
      try {
        const id = ctx.params.id;
        const watcher = ctx.request.body;
        await this.db.update(id, watcher);
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

    this.router.delete('/watcher/:id', async (ctx) => {
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

export const watchersController = new WatchersController();

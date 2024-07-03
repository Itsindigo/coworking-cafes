import Koa from "koa";
import Router from "@koa/router";
import { sql, type DatabasePool } from "slonik";

export const createHealthRouter = (app: Koa, pool: DatabasePool) => {
  let hwRouter = new Router();

  hwRouter.get("/healthz", async (ctx, next) => {
    const [{ result }] = await pool.any(sql.unsafe`SELECT 1 as result;`);

    if (result !== 1) {
      ctx.body = "error, could not connect to SQL database";
      ctx.status = 500;
      return next();
    }

    ctx.body = "ok";
    ctx.status = 200;
    next();
  });

  app.use(hwRouter.routes()).use(hwRouter.allowedMethods());

  return hwRouter;
};

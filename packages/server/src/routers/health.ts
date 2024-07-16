import Koa from "koa";
import Router from "@koa/router";
import { sql } from "slonik";
import type { KoaContext } from "../types.js";

export const createHealthRouter = (app: Koa) => {
  let hwRouter = new Router();

  hwRouter.get<any, KoaContext>("/healthz", async (ctx, next) => {
    const [{ result }] = await ctx.db.any(sql.unsafe`SELECT 1 as result;`);

    if (result !== 1) {
      ctx.body = "error, could not connect to SQL database";
      ctx.status = 500;
      return next();
    }

    ctx.body = "ok";
    ctx.status = 200;
    await next();
  });

  app.use(hwRouter.routes()).use(hwRouter.allowedMethods());

  return hwRouter;
};

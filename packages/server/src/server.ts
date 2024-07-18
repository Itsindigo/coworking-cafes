import Koa from "koa";
import bodyParser from "koa-bodyparser";
import cors from "@koa/cors";
import { createKoaMiddleware } from "./koa_middleware/trpc.js";
import { appRouter } from "./trpc/server.js";
import { createHealthRouter } from "./routers/health.js";
import { getLoggerMiddleware } from "./koa_middleware/logger.js";
import { createTrpcContext } from "./trpc/context.js";
import { createPool } from "slonik";
import { getConfig } from "./config.js";
import type { KoaContext } from "./types.js";

const createApp = async () => {
  const app = new Koa();

  app.use(cors());
  app.use(bodyParser());
  app.use(getLoggerMiddleware());

  app.use<any, KoaContext>((ctx, next) => {
    return createKoaMiddleware({
      router: appRouter,
      prefix: "/trpc",
      createContext: (...args) => createTrpcContext(...args, ctx),
    })(ctx, next);
  });

  app.use<any, KoaContext>(async (ctx, next) => {
    const {
      db: { uri },
    } = getConfig();

    const db = await createPool(uri);
    ctx.db = db;

    await next();
  });

  createHealthRouter(app);

  return app;
};

export default createApp;

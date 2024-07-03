import Koa from "koa";
import logger from "./logger.js";
import loggerMiddleware from "koa-pino-logger";
import bodyParser from "koa-bodyparser";
import cors from "@koa/cors";
import { createKoaMiddleware } from "./koa_middleware/trpc.js";
import { appRouter } from "./trpc/server.js";
import { createPool } from "slonik";
import { getConfig } from "./config.js";
import { createHealthRouter } from "./routers/health.js";

const createApp = async () => {
  const {
    db: { uri },
  } = getConfig();

  const pool = await createPool(uri);
  const app = new Koa();

  app.use(cors());
  app.use(bodyParser());
  app.use(loggerMiddleware({ logger: logger as any }, process.stdout));
  app.use(
    createKoaMiddleware({
      router: appRouter,
      prefix: "/trpc",
    })
  );

  createHealthRouter(app, pool);

  return app;
};

export default createApp;

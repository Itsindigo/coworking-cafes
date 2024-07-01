import Koa from "koa";
import Router from "@koa/router";
import logger from "./logger.js";
import loggerMiddleware from "koa-pino-logger";
import bodyParser from "koa-bodyparser";
import cors from "@koa/cors";
import { createKoaMiddleware } from "./koa_middleware/trpc.js";
import { appRouter } from "./trpc/server.js";

const createHelloWorldRouter = (app: Koa) => {
  let hwRouter = new Router({ prefix: "/api" });

  hwRouter.get("/", (ctx, next) => {
    ctx.body = "hello worldddd";
    ctx.status = 200;
  });
  app.use(hwRouter.routes()).use(hwRouter.allowedMethods());

  return hwRouter;
};

const createApp = () => {
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

  createHelloWorldRouter(app);

  return app;
};

export default createApp;

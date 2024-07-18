import type { Middleware } from "koa";
import logger from "../logger.js";
import loggerMiddleware from "koa-pino-logger";

export const getLoggerMiddleware = (): Middleware => {
  return loggerMiddleware(
    {
      logger: logger as any,
      quietReqLogger: true,
      reqCustomProps: (req, res) => ({
        req: {
          method: req.method,
          url: req.url,
          /* TODO: allow optional headers */
        },
        res: {},
      }),
    },
    process.stdout,
  );
};

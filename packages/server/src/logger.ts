import { pino, type Logger } from "pino";

export const createLogger = (): Logger => {
  const logger = pino({
    transport: {
      target: "pino-pretty",
      options: {
        colorize: true,
      },
    },
    level: "info",
  });

  return logger;
};

let logger = createLogger();

export default logger;

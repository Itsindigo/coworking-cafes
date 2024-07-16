import createApp from "./server.js";
import logger from "./logger.js";
import { createHttpTerminator } from "http-terminator";

async function main() {
  const PORT = 4444;
  const app = await createApp();

  const server = app.listen(PORT, () => {
    logger.info(`Started server on ${PORT}`);
  });

  const httpTerminator = createHttpTerminator({
    server,
  });

  process.on("SIGTERM", async function () {
    await httpTerminator.terminate();
  });

  return server;
}

if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch((err) => {
    logger.error({ err }, "Failed to start server");
    process.exit(1);
  });
}

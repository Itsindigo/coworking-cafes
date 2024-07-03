import createApp from "./server.js";
import logger from "./logger.js";

async function main() {
  const PORT = 4444;
  const server = await createApp();
  return server
    .listen(PORT, () => {
      logger.info(`Started server on ${PORT}`);
    })
    .on("close", () => {
      logger.info(`Server stopped`);
      process.exit(0);
    })
    .on("error", (err) => {
      logger.error("Server encountered error", err);
      process.exit(1);
    });
}

if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch((err) => {
    logger.error("Failed to start server", err);
    process.exit(1);
  });
}

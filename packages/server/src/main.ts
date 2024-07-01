import createApp from "./server.js";
import logger from "./logger.js";

if (import.meta.url === `file://${process.argv[1]}`) {
  const PORT = 4444;
  const server = createApp();
  server.listen(PORT, () => {
    logger.info(`Started server on ${PORT}`);
  });
}

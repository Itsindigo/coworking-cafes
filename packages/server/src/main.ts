import createApp from "./server.js";
import logger from "./logger.js";

if (import.meta.url === `file://${process.argv[1]}`) {
  const PORT = 6666;
  const server = createApp();
  server.listen(PORT, () => {
    logger.info(`Started server on ${PORT}`);
  });
}

import dotenv from "dotenv";
import env from "env-var";
import logger from "./logger.js";

dotenv.config({ path: "../../.server.env" });

const getDbUri = () => {
  const user = env.get("SERVER_DB_USER").required().asString();
  const password = env.get("SERVER_DB_PASSWORD").required().asString();
  const host = env.get("SERVER_DB_HOST").required().asString();
  const post = env.get("SERVER_DB_PORT").required().asString();
  const name = env.get("SERVER_DB_NAME").required().asString();
  return `postgres://${user}:${password}@${host}:${post}/${name}`;
};

let config = undefined;

const getConfig = () => ({
  crypto: {
    secretKey: env.get("CRYPTO_SECRET_KEY").required().asString(),
  },
  db: {
    uri: getDbUri(),
  },
});

if (!config) {
  config = getConfig();
  logger.info("Loaded and validated config. 💻");
}

export default config;

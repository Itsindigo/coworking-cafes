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

interface AppConfig {
  crypto: {
    secretKey: string;
  };
  db: {
    uri: string;
  };
}

let __config: AppConfig;

export const getConfig = (): AppConfig => {
  if (__config) {
    return __config;
  }

  __config = {
    crypto: {
      secretKey: env.get("CRYPTO_SECRET_KEY").required().asString(),
    },
    db: {
      uri: getDbUri(),
    },
  };
  logger.info("Loaded and validated config. 💻");
  return __config;
};

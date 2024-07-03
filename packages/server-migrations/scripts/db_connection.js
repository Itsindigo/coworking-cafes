const dotenv = require("dotenv");
const env = require("env-var");

dotenv.config({ path: "../../.server.env" });

const getDbUri = () => {
  const user = env.get("SERVER_DB_USER").required().asString();
  const password = env.get("SERVER_DB_PASSWORD").required().asString();
  const host = env.get("SERVER_DB_HOST").required().asString();
  const post = env.get("SERVER_DB_PORT").required().asString();
  const name = env.get("SERVER_DB_NAME").required().asString();
  return `postgres://${user}:${password}@${host}:${post}/${name}`;
};

console.log(getDbUri());

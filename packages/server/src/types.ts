import type { DatabasePool } from "slonik";
import type { DefaultContext, ParameterizedContext } from "koa";

export type KoaContext = ParameterizedContext & {
  db: DatabasePool;
};

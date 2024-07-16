import type { DatabasePool } from "slonik";

export type KoaContext = {
  db: DatabasePool;
};

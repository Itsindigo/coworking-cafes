import type { DatabasePool } from "slonik";

export enum UserSource {
  GOOGLE = "GOOGLE",
  USER_EMAIL = "USER_EMAIL",
}

export type User = {
  id?: string;
  email: string;
  givenName?: string;
  familyName?: string;
  source: UserSource;
};

export type PersistedUser = User & { id: string };

export type UserTable = {};

export type KoaContext = {
  db: DatabasePool;
};

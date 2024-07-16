import type { DatabasePool } from "slonik";
import type { UserSource } from "../../types.js";

export interface GetOrCreateUserOptions {
  givenName?: string;
  familyName?: string;
  email: string;
  source: UserSource;
}

export interface UserService {
  getOrCreateUser: (options: GetOrCreateUserOptions) => Promise<void>;
}

export const userServiceFactory = ({
  db,
}: {
  db: DatabasePool;
}): UserService => {
  const getOrCreateUser = async ({
    givenName,
    familyName,
    email,
  }: GetOrCreateUserOptions) => {};

  return {
    getOrCreateUser,
  };
};

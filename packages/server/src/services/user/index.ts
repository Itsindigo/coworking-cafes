import {
  createUser,
  findUser,
  UserSource,
  type User,
} from "../../dao/user/index.js";
import type { DatabasePool } from "slonik";

export interface GetOrCreateUserOptions {
  givenName?: string;
  familyName?: string;
  email: string;
  source: UserSource;
}

export interface UserService {
  getOrCreateUser: (options: GetOrCreateUserOptions) => Promise<User>;
}

export const userServiceFactory = ({
  pool,
}: {
  pool: DatabasePool;
}): UserService => {
  const getOrCreateUser = async ({
    givenName,
    familyName,
    email,
  }: GetOrCreateUserOptions): Promise<User> => {
    return await pool.connect(async (connection) => {
      const user = await findUser(connection, { email });

      if (user) {
        return user;
      }

      return await createUser(connection, {
        givenName,
        familyName,
        email,
        source: UserSource.GOOGLE,
      });
    });
  };

  return {
    getOrCreateUser,
  };
};

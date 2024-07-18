import {
  createUser,
  findUser,
  UserSource,
  type User,
} from "../../dao/user/index.js";
import type { DatabasePool } from "slonik";
import type { usernameServiceFactory } from "../username/index.js";

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
  usernameService,
}: {
  pool: DatabasePool;
  usernameService: ReturnType<typeof usernameServiceFactory>;
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
        username: usernameService.generateUsername(),
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

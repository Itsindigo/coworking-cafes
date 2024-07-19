import UserDAO, { UserSource, type User } from "../../dao/user/index.js";
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
  findUserById: (id: string) => Promise<User | null>;
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
      const user = await UserDAO.findUser(connection, { email });

      if (user) {
        return user;
      }

      return await UserDAO.createUser(connection, {
        username: usernameService.generateUsername(),
        givenName,
        familyName,
        email,
        source: UserSource.GOOGLE,
      });
    });
  };

  const findUserById = async (id: string): Promise<User | null> => {
    return await pool.connect(async (connection) => {
      const user = await UserDAO.findUser(connection, { id });

      if (user) {
        return user;
      }

      return null;
    });
  };

  return {
    findUserById,
    getOrCreateUser,
  };
};

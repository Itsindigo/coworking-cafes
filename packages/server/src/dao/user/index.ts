import {
  sql,
  type DatabaseConnection,
  type FragmentSqlToken,
  createSqlTokenSqlFragment,
} from "slonik";
import { z } from "zod";

export enum UserSource {
  GOOGLE = "GOOGLE",
  USER_EMAIL = "USER_EMAIL",
}

export type FindUserOptions = {
  email?: string;
  id?: string;
};

const userObject = z.object({
  id: z.string(),
  email: z.string(),
  username: z.string(),
  givenName: z.string().optional(),
  familyName: z.string().optional(),
  source: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type User = z.infer<typeof userObject>;

export const findUser = async (
  connection: DatabaseConnection,
  { email, id }: FindUserOptions,
): Promise<User | null> => {
  if (!email && !id) {
    throw new Error("Cannot query user without either email or id");
  }

  let whereFragment: FragmentSqlToken = sql.fragment``;

  if (email && id) {
    whereFragment = sql.fragment`WHERE email = ${email} AND id = ${id}`;
  } else if (email) {
    whereFragment = sql.fragment`WHERE email = ${email}`;
  } else if (id) {
    whereFragment = sql.fragment`WHERE id = ${id}`;
  }

  const [record] = await connection.any<typeof userObject>(
    sql.type(userObject)`
      SELECT
        id,
        email,
        username,
        given_name as "givenName",
        family_name as "familyName",
        source,
        created_at as "createdAt",
        updated_at as "updatedAt"
      FROM "user"
      ${whereFragment}`,
  );

  return record ?? null;
};

export const createUser = async (
  connection: DatabaseConnection,
  user: Omit<User, "id" | "createdAt" | "updatedAt">,
): Promise<User> => {
  const [record] = await connection.any<typeof userObject>(
    sql.type(userObject)`
      INSERT INTO "user" (email, username, given_name, family_name, source)
      VALUES (
        ${user.email},
        ${user.username},
        ${user.givenName ?? null},
        ${user.familyName ?? null},
        ${user.source}
      ) RETURNING
        id,
        email,
        username,
        given_name as "givenName",
        family_name as "familyName",
        source,
        created_at as "createdAt",
        updated_at as "updatedAt"
    `,
  );

  if (!record) {
    throw new Error(`Error creating user: ${user.email}`);
  }

  return record;
};

export default { findUser, createUser };

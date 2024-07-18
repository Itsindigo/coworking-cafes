import { sql, type DatabaseConnection } from "slonik";
import { z } from "zod";

export enum UserSource {
  GOOGLE = "GOOGLE",
  USER_EMAIL = "USER_EMAIL",
}

export interface FindUserOptions {
  email: string;
}

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
  { email }: FindUserOptions,
): Promise<User | null> => {
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
      WHERE email = ${email}`,
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

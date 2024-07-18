import { ColumnDefinitions, MigrationBuilder } from "node-pg-migrate";

export const shorthands: ColumnDefinitions | undefined = undefined;

const USERNAME_COLUMN = "username";
const USER_TABLE = "user";

export async function up(pgm: MigrationBuilder): Promise<void> {
  await pgm.addColumn(USER_TABLE, {
    [USERNAME_COLUMN]: {
      type: "TEXT",
      unique: true,
      notNull: true,
    },
  });
  return;
}

export async function down(pgm: MigrationBuilder): Promise<void> {
  await pgm.dropColumn(USER_TABLE, USERNAME_COLUMN);
}

import type { ColumnDefinitions, MigrationBuilder } from "node-pg-migrate";

export const shorthands: ColumnDefinitions | undefined = undefined;

export async function up(pgm: MigrationBuilder): Promise<void> {
  pgm.createExtension("uuid-ossp", { ifNotExists: true });
  await pgm.createTable("user", {
    id: {
      type: "uuid",
      default: pgm.func("uuid_generate_v4()"),
      primaryKey: true,
    },
    email: { type: "text", notNull: true },
    source: { type: "text", notNull: true },
    given_name: { type: "text" },
    family_name: { type: "text" },
    created_at: { type: "timestamp", default: pgm.func("current_timestamp") },
    updated_at: { type: "timestamp", default: pgm.func("current_timestamp") },
  });

  await pgm.createIndex("user", "email", { unique: true });
  await pgm.addConstraint(
    "user",
    "source_check",
    "CHECK (source IN ('GOOGLE', 'USER_EMAIL'))",
  );
}

export async function down(pgm: MigrationBuilder): Promise<void> {}

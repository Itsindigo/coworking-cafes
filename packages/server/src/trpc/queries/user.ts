import type { inferProcedureBuilderResolverOptions } from "@trpc/server";
import type { getMeProcedure } from "../routers/user.js";

export const getMeQuery = async ({
  ctx: { services, cookies },
}: inferProcedureBuilderResolverOptions<typeof getMeProcedure>) => {};

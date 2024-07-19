import type { inferProcedureBuilderResolverOptions } from "@trpc/server";
import type { getMeProcedure } from "../routers/user.js";

export const getMeQuery = async ({
  ctx,
}: inferProcedureBuilderResolverOptions<typeof getMeProcedure>) => {
  // To do here, return relevant data for the user

  return { user: ctx.user };
};

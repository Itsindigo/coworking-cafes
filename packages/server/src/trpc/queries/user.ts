import {
  TRPCError,
  type inferProcedureBuilderResolverOptions,
} from "@trpc/server";
import type { getMeProcedure } from "../routers/user.js";

export const getMeQuery = async ({
  ctx,
}: inferProcedureBuilderResolverOptions<typeof getMeProcedure>) => {
  const user = await ctx.services.user.findUserById(ctx.user.id);

  if (!user) {
    throw new TRPCError({
      code: "NOT_FOUND",
      message: "User not found",
    });
  }

  return {
    user: {
      email: user.email,
      username: user.username,
      givenName: user.givenName,
      familyName: user.familyName,
    },
  };
};

import { TRPCError } from "@trpc/server";
import { AUTH_COOKIE_NAME } from "../../services/userAuth/constants.js";
import { publicProcedure } from "./public.js";

export const authedProcedure = publicProcedure.use(async function (opts) {
  const { ctx } = opts;
  try {
    const token = ctx.cookies.get(AUTH_COOKIE_NAME);

    if (!token) {
      throw new TRPCError({
        code: "UNAUTHORIZED",
        message: "You must be logged in to perform this action",
      });
    }

    const jwt = ctx.services.userAuth.verifyAuthToken(token);

    return opts.next({
      ctx: {
        ...ctx,
        user: {
          email: jwt.email,
          username: jwt.username,
          id: jwt.id,
        },
      },
    });
  } catch {
    throw new TRPCError({
      code: "UNAUTHORIZED",
      message: "You must be logged in to perform this action",
    });
  }
});

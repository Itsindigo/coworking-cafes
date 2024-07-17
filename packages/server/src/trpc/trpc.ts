import { initTRPC, TRPCError } from "@trpc/server";
import type { TrpcContext } from "../context.js";
import { AUTH_COOKIE_NAME } from "../services/userAuth/constants.js";

/**
 * Initialization of tRPC backend
 * Should be done only once per backend!
 */
const t = initTRPC.context<TrpcContext>().create();

/**
 * Export reusable router and procedure helpers
 * that can be used throughout the router
 */
export const router = t.router;
export const publicProcedure = t.procedure;

export const authedProcedure = t.procedure.use(async function (opts) {
  const { ctx } = opts;
  try {
    const token = ctx.cookies.get(AUTH_COOKIE_NAME);

    if (!token) {
      throw new TRPCError({
        code: "UNAUTHORIZED",
        message: "You must be logged in to perform this action",
      });
    }

    ctx.services.userAuth.verifyAuthToken(token);

    return opts.next({
      ctx: {
        isAuthed: true,
      },
    });
  } catch {
    throw new TRPCError({
      code: "UNAUTHORIZED",
      message: "You must be logged in to perform this action",
    });
  }
});

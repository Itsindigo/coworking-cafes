import { router, publicProcedure } from "../trpc.js";
import { z } from "zod";
import { googleAuthRedirectMutation } from "../mutations/googleAuthRedirect.js";

export const getUserAuthRouter = () =>
  router({
    googleAuthRedirect: publicProcedure
      .input(z.object({ credential: z.string() }))
      .mutation(googleAuthRedirectMutation),
  });

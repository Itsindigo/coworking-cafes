import { router, publicProcedure } from "../trpc.js";
import { z } from "zod";
import {
  googleAuthRedirectMutation,
  logoutMutation,
} from "../mutations/userAuth.js";

export const googleAuthRedirectProcedure = publicProcedure.input(
  z.object({ credential: z.string() }),
);

export const logoutProcedure = publicProcedure.input(z.void());

export const getUserAuthRouter = () =>
  router({
    googleAuthRedirect: googleAuthRedirectProcedure.mutation(
      googleAuthRedirectMutation,
    ),
    logout: logoutProcedure.mutation(logoutMutation),
  });

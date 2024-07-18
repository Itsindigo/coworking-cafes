import { router } from "../trpc.js";
import { publicProcedure } from "../procedures/public.js";
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

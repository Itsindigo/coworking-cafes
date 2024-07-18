import { router } from "../trpc.js";
import { z } from "zod";
import { getMeQuery } from "../queries/user.js";
import { authedProcedure } from "../procedures/authed.js";

export const getMeProcedure = authedProcedure.input(z.void());

export const getUserAuthRouter = () =>
  router({
    getMe: getMeProcedure.query(getMeQuery),
  });

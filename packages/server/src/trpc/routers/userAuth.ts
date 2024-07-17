import { TRPCError } from "@trpc/server";
import logger from "../../logger.js";
import { router, publicProcedure } from "../trpc.js";
import { z } from "zod";
import { UserSource } from "../../dao/user/index.js";
import {
  AUTH_COOKIE_NAME,
  THIRTY_DAYS_MS,
} from "../../services/userAuth/constants.js";
import { JWTVerificationError } from "../../exceptions.js";
import { toUnix } from "../../utils/datetime.js";

export const getUserAuthRouter = () =>
  router({
    googleAuthRedirect: publicProcedure
      .input(z.object({ credential: z.string() }))
      .mutation(
        async ({ input: { credential }, ctx: { services, cookies } }) => {
          try {
            const {
              email,
              given_name: givenName,
              family_name: familyName,
            } = await services.googleAuth.decodeGoogleToken(credential);

            const { id } = await services.user.getOrCreateUser({
              email,
              givenName,
              familyName,
              source: UserSource.GOOGLE,
            });

            const { token, expiresAt } = services.userAuth.createAuthToken({
              email,
            });

            cookies.set(AUTH_COOKIE_NAME, token, {
              httpOnly: true,
              secure: false,
              expires: expiresAt,
            });

            return {
              email,
              id,
              expiresAt: toUnix(expiresAt),
            };
          } catch (err: any) {
            logger.error({ err }, "Failed to authenticate with Google");

            if (err instanceof JWTVerificationError) {
              throw new TRPCError({
                code: "UNAUTHORIZED",
                message: err.message,
              });
            }

            throw new TRPCError({
              code: "INTERNAL_SERVER_ERROR",
              message: err.message,
              cause: String(err),
            });
          }
        }
      ),
  });

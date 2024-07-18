import {
  TRPCError,
  type inferProcedureBuilderResolverOptions,
} from "@trpc/server";
import { UserSource } from "../../dao/user/index.js";
import { AUTH_COOKIE_NAME } from "../../services/userAuth/constants.js";
import { toUnix } from "../../utils/datetime.js";
import logger from "../../logger.js";
import { JWTVerificationError } from "../../exceptions.js";
import type {
  googleAuthRedirectProcedure,
  logoutProcedure,
} from "../routers/userAuth.js";

export const googleAuthRedirectMutation = async ({
  input: { credential },
  ctx: { services, cookies },
}: inferProcedureBuilderResolverOptions<
  typeof googleAuthRedirectProcedure
>) => {
  try {
    const {
      email,
      given_name: givenName,
      family_name: familyName,
    } = await services.googleAuth.decodeGoogleToken(credential);

    const { id, username } = await services.user.getOrCreateUser({
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
      username,
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
};

export const logoutMutation = async ({
  ctx: { cookies },
}: inferProcedureBuilderResolverOptions<typeof logoutProcedure>) => {
  cookies.set(AUTH_COOKIE_NAME, null, {
    httpOnly: true,
    secure: false,
    expires: undefined,
  });
};

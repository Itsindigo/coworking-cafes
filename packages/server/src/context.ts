import * as Cookies from "cookies";
import { createPool } from "slonik";
import { type CreateTrpcKoaContextOptions } from "./koa_middleware/trpc.js";
import { getConfig } from "./config.js";
import { userServiceFactory } from "./services/user/index.js";
import { googleAuthServiceFactory } from "./services/googleAuth/index.js";
import { userAuthServiceFactory } from "./services/userAuth/index.js";
import type { ServerResponse, IncomingMessage } from "http";
import type { KoaContext } from "./types.js";
import { usernameServiceFactory } from "./services/username/index.js";

export interface TrpcContext {
  req: IncomingMessage;
  res: ServerResponse<IncomingMessage>;
  services: {
    user: ReturnType<typeof userServiceFactory>;
    username: ReturnType<typeof usernameServiceFactory>;
    userAuth: ReturnType<typeof userAuthServiceFactory>;
    googleAuth: ReturnType<typeof googleAuthServiceFactory>;
  };
  cookies: Cookies;
}

export const createTrpcContext = async (
  ctx: CreateTrpcKoaContextOptions,
  { req, res, cookies }: KoaContext,
): Promise<TrpcContext> => {
  const {
    db: { uri },
  } = getConfig();

  const pool = await createPool(uri);

  const usernameService = usernameServiceFactory();
  const userService = userServiceFactory({ pool, usernameService });
  const googleAuthService = googleAuthServiceFactory();
  const userAuthService = userAuthServiceFactory();

  return {
    services: {
      user: userService,
      username: usernameService,
      userAuth: userAuthService,
      googleAuth: googleAuthService,
    },
    req,
    res,
    cookies,
  };
};

import { createPool } from "slonik";
import { type CreateTrpcKoaContextOptions } from "./koa_middleware/trpc.js";
import { getConfig } from "./config.js";
import { userServiceFactory } from "./services/user/index.js";
import { googleAuthServiceFactory } from "./services/googleAuth/index.js";

export interface TrpcContext {
  services: {
    user: ReturnType<typeof userServiceFactory>;
    googleAuth: ReturnType<typeof googleAuthServiceFactory>;
  };
}

export const createTrpcContext = async ({
  req,
  res,
}: CreateTrpcKoaContextOptions): Promise<TrpcContext> => {
  const {
    db: { uri },
  } = getConfig();

  const pool = await createPool(uri);

  const userService = userServiceFactory({ pool });
  const googleAuthService = googleAuthServiceFactory();

  return {
    services: {
      user: userService,
      googleAuth: googleAuthService,
    },
  };
};

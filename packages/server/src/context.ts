import { createPool } from "slonik";
import { type CreateTrpcKoaContextOptions } from "./koa_middleware/trpc.js";
import { getConfig } from "./config.js";
import { userServiceFactory } from "./services/user/index.js";
import { googleAuthServiceFactory } from "./services/googleAuth/index.js";

export interface TrpcContext {
  db: Awaited<ReturnType<typeof createPool>>;
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

  const db = await createPool(uri);

  const userService = userServiceFactory({ db });
  const googleAuthService = googleAuthServiceFactory();

  return {
    db,
    services: {
      user: userService,
      googleAuth: googleAuthService,
    },
  };
};

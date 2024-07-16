interface GetOrCreateUserOptions {
  givenName?: string;
  familyName?: string;
  email: string;
}

export const userServiceFactory = () => {
  const getOrCreateUser = async ({
    givenName,
    familyName,
    email,
  }: GetOrCreateUserOptions) => {};

  return {
    getOrCreateUser,
  };
};

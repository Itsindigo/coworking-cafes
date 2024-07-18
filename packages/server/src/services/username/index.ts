import { faker } from "@faker-js/faker";
import { sanitiseString } from "./utils.js";

export const usernameServiceFactory = () => {
  const generateUsername = (): string => {
    const adjective = faker.word.adjective();
    const animal = sanitiseString(faker.animal.type());
    return `${adjective}-${animal}-${faker.number.int({ min: 1, max: 9999 })}`;
  };

  return {
    generateUsername,
  };
};

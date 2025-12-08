import { prisma } from "../../server";

export const createUserService = async (
  name: string,
  email: string,
  password: string
) => {
  const newUser = await prisma.user.create({
    data: {
      name,
      email,
      password,
    },
  });
  return newUser;
};

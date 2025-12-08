import { prisma } from "../../server";

export const getUserByEmailService = async (email: string) => {
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });
  return user;
};

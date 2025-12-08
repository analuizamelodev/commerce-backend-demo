import { prisma } from "../../server";

export const getProductByIdService = async (id: number) => {
  const product = await prisma.product.findUnique({
    where: { id },
  });
  return product;
};

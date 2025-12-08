import { prisma } from "../../server";

export const getAllProductsService = async () => {
  const products = await prisma.product.findMany();
  return products;
};

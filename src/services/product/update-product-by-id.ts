import { prisma } from "../../server";

export const updateByIdProductService = async (
  id: number,
  data: {
    name?: string;
    category?: string;
    pricePurchase?: number;
    priceSale?: number;
  }
) => {
  return await prisma.product.update({
    where: { id },
    data,
  });
};

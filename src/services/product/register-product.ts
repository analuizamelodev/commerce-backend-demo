import { prisma } from "../../server";

export const registerProductService = async (
  name: string,
  category: string,
  pricePurchase: number,
  priceSale: number
) => {
  await prisma.product.create({
    data: {
      name,
      category,
      pricePurchase,
      priceSale,
    },
  });
};

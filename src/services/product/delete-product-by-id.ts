import { prisma } from "../../server";

export const deleteProductByIdService = async (id: number) => {
  const deletar = await prisma.product.delete({
    where: { id },
  });

  return deletar;
};

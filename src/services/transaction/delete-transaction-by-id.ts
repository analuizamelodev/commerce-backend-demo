import { prisma } from "../../server";

export const deleteTransactionByIdService = async (transactionId: number) => {
  const deleted = await prisma.productsOnTransactions.delete({
    where: { id: transactionId },
  });

  return deleted;
};

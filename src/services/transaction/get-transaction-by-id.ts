import { prisma } from "../../server";

export const getTransactionByIdService = async (transactionId: number) => {
  const transaction = await prisma.productsOnTransactions.findUnique({
    where: { id: transactionId },
  });

  return transaction;
};

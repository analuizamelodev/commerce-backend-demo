import { prisma } from "../../server";

export const getAllTransactionsService = async () => {
  const transactions = await prisma.productsOnTransactions.findMany();
  return transactions;
};

import { prisma } from "../../server";

type TransactionType = "purchase" | "sale";

interface ProductInput {
  productId: string;
  quantity: number;
  unitPrice: number;
}

export const createTransactionService = async (
  type: TransactionType,
  products: ProductInput[]
) => {
  const transaction = await prisma.transaction.create({
    data: { type },
  });

  const items = [];

  for (const item of products) {
    const { productId, quantity, unitPrice } = item;

    const totalPrice = quantity * unitPrice;

    if (type === "sale") {
      await prisma.product.update({
        where: { id: productId },
        data: { quantity: { decrement: quantity } },
      });
    } else if (type === "purchase") {
      await prisma.product.update({
        where: { id: productId },
        data: { quantity: { increment: quantity } },
      });
    }

    const productOnTransaction = await prisma.productsOnTransactions.create({
      data: {
        productId,
        transactionId: transaction.id,
        quantity,
        unitPrice,
        totalPrice,
      },
    });

    items.push(productOnTransaction);
  }

  return { transaction, items };
};

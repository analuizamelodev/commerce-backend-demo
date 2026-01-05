import { prisma } from "../../server";
import { z } from "zod";

type TransactionType = "purchase" | "sale";

const productInputSchema = z.object({
  productId: z.coerce.number().int().positive(),
  quantity: z.coerce.number().int().positive(),
  unitPrice: z.coerce.number().positive(),
});

type ProductInput = z.infer<typeof productInputSchema>;

export const createTransactionService = async (
  type: TransactionType,
  products: ProductInput[]
) => {
  return await prisma.$transaction(async (tx) => {
    const transaction = await tx.transaction.create({
      data: { type },
    });

    const items = [];

    for (const item of products) {
      const { productId, quantity, unitPrice } = productInputSchema.parse(item);

      const totalPrice = quantity * unitPrice;

      // Atualiza estoque
      if (type === "sale") {
        await tx.product.update({
          where: { id: productId },
          data: { quantity: { decrement: quantity } },
        });
      }

      if (type === "purchase") {
        await tx.product.update({
          where: { id: productId },
          data: { quantity: { increment: quantity } },
        });
      }

      const productOnTransaction = await tx.productsOnTransactions.create({
        data: {
          product: {
            connect: { id: productId },
          },
          transaction: {
            connect: { id: transaction.id },
          },
          quantity,
          unitPrice,
          totalPrice,
        },
      });

      items.push(productOnTransaction);
    }

    return { transaction, items };
  });
};

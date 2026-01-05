import { Request, Response } from "express";
import { updateByIdProductService } from "../../services/product/update-product-by-id";

export const updateByIdProductController = async (
  req: Request,
  res: Response
) => {
  try {
    const { name, category, pricePurchase, priceSale } = req.body;
    const { id } = req.params;
    await updateByIdProductService(Number(id), {
      name,
      category,
      pricePurchase,
      priceSale,
    });

    return res.status(200).json({ message: "Product successfully updated" });
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
};

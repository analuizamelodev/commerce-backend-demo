import { Request, Response } from "express";
import { updateByIdProductService } from "../../services/product/update-product-by-id";
import { getUserFromToken } from "../../services/utils/get-user-from-token";

export const updateByIdProductController = async (
  req: Request,
  res: Response
) => {
  try {
    const { valid, user, error } = getUserFromToken(req);

    if (!valid || !user) {
      return res.status(401).json({ error: error || "Unauthorized access" });
    }
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

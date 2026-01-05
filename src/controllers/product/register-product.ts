import { Request, Response } from "express";
import { registerProductService } from "../../services/product/register-product";

export const registerProductController = async (
  req: Request,
  res: Response
) => {
  try {
    const { name, category, pricePurchase, priceSale } = req.body;

    await registerProductService(name, category, pricePurchase, priceSale);

    return res.status(201).json({ message: "Product successfully registered" });
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
};

import { Router } from "express";

import { logInToUserController } from "../controllers/authentication/log-in-to-user";
import { registerUserController } from "../controllers/authentication/register-user";

import { registerProductController } from "../controllers/product/register-product";
import { getAllProductsController } from "../controllers/product/get-all-products";
import { getProductByIdController } from "../controllers/product/get-product-by-id";
import { updateByIdProductController } from "../controllers/product/update-product-by-id";
import { deleteProductController } from "../controllers/product/delete-product-by-id";

import { createTransactionController } from "../controllers/transaction/create-transaction";
import { getAllTransactionsController } from "../controllers/transaction/get-all-transactions";
import { getTransactionByIdController } from "../controllers/transaction/get-transaction-by-id";
import { deleteTransactionByIdController } from "../controllers/transaction/delete-transaction-by-id";
import { updateTransactionByIdController } from "../controllers/transaction/update-transaction-by-id";

import { authMiddleware } from "../middlewares/auth-middleware";

export const router = Router();

/**
 * @swagger
 * tags:
 *   name: Authentication
 *   description: Authentication endpoints
 */

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: John Doe
 *               email:
 *                 type: string
 *                 example: user@email.com
 *               password:
 *                 type: string
 *                 example: password123
 *     responses:
 *       201:
 *         description: User successfully registered
 */
router.post("/auth/register", registerUserController);

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: User login
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: user@email.com
 *               password:
 *                 type: string
 *                 example: password123
 *     responses:
 *       200:
 *         description: Login successful
 */
router.post("/auth/login", logInToUserController);

/**
 * @swagger
 * tags:
 *   name: Product
 *   description: Product management endpoints
 */

/**
 * @swagger
 * /products:
 *   post:
 *     summary: Create a new product
 *     tags: [Product]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Notebook
 *               category:
 *                 type: string
 *                 example: Electronics
 *               pricePurchase:
 *                 type: number
 *                 example: 2500
 *               priceSale:
 *                 type: number
 *                 example: 3200
 *               quantity:
 *                 type: integer
 *                 example: 10
 *     responses:
 *       201:
 *         description: Product created successfully
 */
router.post("/products", registerProductController);

/**
 * @swagger
 * /products:
 *   get:
 *     summary: Get all products
 *     tags: [Product]
 *     responses:
 *       200:
 *         description: Products retrieved successfully
 */
router.get("/products", getAllProductsController);

/**
 * @swagger
 * /products/{id}:
 *   get:
 *     summary: Get product by ID
 *     tags: [Product]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Product found
 *       404:
 *         description: Product not found
 */
router.get("/products/:id", getProductByIdController);

/**
 * @swagger
 * /products/{id}:
 *   put:
 *     summary: Update a product
 *     tags: [Product]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           example: 1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: Product updated successfully
 *       404:
 *         description: Product not found
 */
router.put("/products/:id", updateByIdProductController);

/**
 * @swagger
 * /products/{id}:
 *   delete:
 *     summary: Delete a product
 *     tags: [Product]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       204:
 *         description: Product deleted successfully
 *       404:
 *         description: Product not found
 */
router.delete("/products/:id", deleteProductController);

/**
 * @swagger
 * tags:
 *   name: Transaction
 *   description: Transaction endpoints
 */

/**
 * @swagger
 * /transactions:
 *   post:
 *     summary: Create a transaction (purchase or sale)
 *     tags: [Transaction]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               type:
 *                 type: string
 *                 enum: [purchase, sale]
 *               products:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     productId:
 *                       type: integer
 *                       example: 1
 *                     quantity:
 *                       type: integer
 *                       example: 2
 *                     unitPrice:
 *                       type: number
 *                       example: 150
 *     responses:
 *       201:
 *         description: Transaction created successfully
 */
router.post("/transactions", createTransactionController);

/**
 * @swagger
 * /transactions:
 *   get:
 *     summary: Get all transactions
 *     tags: [Transaction]
 *     responses:
 *       200:
 *         description: Transactions retrieved successfully
 */
router.get("/transactions", getAllTransactionsController);

/**
 * @swagger
 * /transactions/{id}:
 *   get:
 *     summary: Get transaction by ID
 *     tags: [Transaction]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Transaction found
 *       404:
 *         description: Transaction not found
 */
router.get("/transactions/:id", getTransactionByIdController);

/**
 * @swagger
 * /transactions/{id}:
 *   delete:
 *     summary: Delete a transaction
 *     tags: [Transaction]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       204:
 *         description: Transaction deleted successfully
 */
router.delete("/transactions/:id", deleteTransactionByIdController);

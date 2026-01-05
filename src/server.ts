import express from "express";

import "dotenv/config";

import { router } from "./routes/index";

import { swaggerUi, swaggerSpec } from "./swagger";

import { PrismaClient } from "@prisma/client";

import { PrismaPg } from "@prisma/adapter-pg";

import cors from "cors";
import { validateToken } from "./services/authentication/auth/validate-token";

const pool = new PrismaPg({ connectionString: process.env.DATABASE_URL! });

const prisma = new PrismaClient({ adapter: pool });

const server = express();

server.use(cors());

server.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

server.use(express.json());

server.use(router);

export { server, prisma };

server.listen(3000, () => {
  console.log("🚀 Servidor rodando em http://localhost:3000");
  console.log("📘 Swagger disponível em http://localhost:3000/api-docs");
});

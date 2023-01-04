import type { NextApiRequest, NextApiResponse } from "next";
import { authMiddleware } from "middlewares/auth";
import { User } from "models/user";
import { Order } from "models/order";
import { handleOrder } from "controllers/order";
import methods from "micro-method-router";
import { Product } from "models/products";

async function postHandler(
  req: NextApiRequest,
  res: NextApiResponse,
  token: any
) {
  res.json({});
}

const handler = methods({
  post: postHandler,
});

export default authMiddleware(handler);

import type { NextApiRequest, NextApiResponse } from "next";
import { authMiddleware } from "middlewares/auth";
import methods from "micro-method-router";
import { getOrderById, handleOrder } from "controllers/order";

async function getHandler(
  req: NextApiRequest,
  res: NextApiResponse,
  token: any
) {
  const { orderId } = req.query;
  const order = await getOrderById(orderId as string);
  res.send({ order });
}

const handler = methods({
  get: getHandler,
});

export default authMiddleware(handler);

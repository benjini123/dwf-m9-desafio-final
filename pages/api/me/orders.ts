import { NextApiRequest, NextApiResponse } from "next";
import { authMiddleware } from "middlewares/auth";
import { getMyOrders } from "controllers/order";
import methods from "micro-method-router";

async function getHandler(
  req: NextApiRequest,
  res: NextApiResponse,
  token: any
) {
  const { userId } = token;
  const orders = await getMyOrders(userId);
  res.send({ orders });
}

const handler = methods({
  get: getHandler,
});

export default authMiddleware(handler);

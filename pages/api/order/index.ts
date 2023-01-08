import type { NextApiRequest, NextApiResponse } from "next";
import { authMiddleware } from "middlewares/auth";
import { handleOrder } from "controllers/order";
import methods from "micro-method-router";

async function postHandler(
  req: NextApiRequest,
  res: NextApiResponse,
  token: any
) {
  const { productId } = req.query;
  const { userId } = token;
  const productData = req.body;

  try {
    const order: any = await handleOrder(userId, productId, productData);
    res.send({ orderUrl: order.initPoint, orderId: order.id });
  } catch (e: any) {
    console.log({ error: e.message });
    res.status(400).send({ message: e.message });
  }
}

const handler = methods({
  post: postHandler,
});

export default authMiddleware(handler);

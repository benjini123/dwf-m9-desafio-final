import type { NextApiRequest, NextApiResponse } from "next";
import { authMiddleware } from "middlewares/auth";
import { User } from "models/user";
import { Order } from "models/order";
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

  const initPoint = await handleOrder(userId, productId, productData);
  try {
    res.send({ url: initPoint });
  } catch {
    res.status(200).json({ message: "there has been an error" });
  }
}

const handler = methods({
  post: postHandler,
});

export default authMiddleware(handler);

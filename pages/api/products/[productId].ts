import type { NextApiRequest, NextApiResponse } from "next";
import { authMiddleware } from "middlewares/auth";
import methods from "micro-method-router";
import { getProductById } from "controllers/product";

async function getHandler(
  req: NextApiRequest,
  res: NextApiResponse,
  token: any
) {
  console.log("sss");
  const { productId } = req.query;
  try {
    const product = await getProductById(productId as string);
    res.json({ product });
  } catch (e: any) {
    console.log({ error: e.message });
    res.status(e.status).send({ message: e.message });
  }
}

const handler = methods({
  get: getHandler,
});

export default authMiddleware(handler);

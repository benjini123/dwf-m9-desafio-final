import type { NextApiRequest, NextApiResponse } from "next";
import { sendCode } from "controllers/auth";
import methods from "micro-method-router";
import { authMiddleware } from "middlewares/auth";
import { yupAuthMiddleware } from "yup/auth";

async function postHandler(req: NextApiRequest, res: NextApiResponse) {
  const auth = await sendCode(req.body.email);
  res.send(auth);
}
const yupHandler = yupAuthMiddleware(postHandler);

const handler: any = methods({
  post: yupHandler,
});

export default authMiddleware(handler);

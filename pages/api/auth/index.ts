import type { NextApiRequest, NextApiResponse } from "next";
import { sendCode } from "controllers/auth";
import methods from "micro-method-router";
import { authMiddleware } from "middlewares/auth";
import { yupAuthMiddleware } from "middlewares/yup";

const apimethods = methods({
  async post(req: NextApiRequest, res: NextApiResponse) {
    const auth = await sendCode(req.body.email);
    res.send(auth);
  },
});

const handler: any = yupAuthMiddleware(apimethods);

export default authMiddleware(handler);

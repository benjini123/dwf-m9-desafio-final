import type { NextApiRequest, NextApiResponse } from "next";
import { verifyCode } from "controllers/token";
import methods from "micro-method-router";
import { yupTokenMiddleware } from "yup/token";

async function getTokenFromCode(req: NextApiRequest, res: NextApiResponse) {
  const { email, code } = req.body;
  try {
    const token = await verifyCode(email, code);
    res.send({ token });
  } catch (e: any) {
    res.status(400).send({ message: e.message });
  }
}

const handler = methods({
  get: getTokenFromCode,
});

export default yupTokenMiddleware(handler);

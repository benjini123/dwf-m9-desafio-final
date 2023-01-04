import type { NextApiRequest, NextApiResponse } from "next";
import { generate } from "middlewares/jwt";
import { Auth } from "models/auth";
import { isAfter } from "date-fns";

export default async function (req: NextApiRequest, res: NextApiResponse) {
  const { email, code } = req.body;
  var auth: any = await Auth.findByEmailAndCode(email, code);
  if (!auth) {
    res.status(401).send({ message: "not allowed" });
  }
  const expired = auth.isCodeExpired();
  if (expired) {
    res.status(401).send({ message: "token expirado" });
  }
  const token = generate({ userId: auth.data.userId });
  res.send({ token });
}

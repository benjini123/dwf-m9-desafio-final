import { NextApiRequest, NextApiResponse } from "next";
import { authMiddleware } from "middlewares/auth";
import { User } from "models/user";

async function handler(req: NextApiRequest, res: NextApiResponse, token: any) {
  const user = new User(token.userId);
  await user.pull();
  res.send(user.data);
}

export default authMiddleware(handler);
//

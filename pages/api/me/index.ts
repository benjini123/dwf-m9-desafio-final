import { NextApiRequest, NextApiResponse } from "next";
import { authMiddleware } from "middlewares/auth";
import { getUserData, updateUser } from "controllers/me/index";
import methods from "micro-method-router";

async function getHandler(
  req: NextApiRequest,
  res: NextApiResponse,
  token: any
) {
  const user = await getUserData(token.userId);
  res.send({ user });
}

async function patchHandler(
  req: NextApiRequest,
  res: NextApiResponse,
  token: any
) {
  const updatedUser = await updateUser(token.userId, req.body);
  res.send({ updatedUser });
}

const handler = methods({
  get: getHandler,
  patch: patchHandler,
});

export default authMiddleware(handler);
//

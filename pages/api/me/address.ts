import { NextApiRequest, NextApiResponse } from "next";
import { authMiddleware } from "middlewares/auth";
import { updateUserAddress } from "controllers/me/address";
import { yupAddressMiddleware } from "yup/address";
import methods from "micro-method-router";

async function patchHandler(
  req: NextApiRequest,
  res: NextApiResponse,
  token: any
) {
  const { address } = req.body;
  const updatedUserAdress = await updateUserAddress(token.userId, address);
  res.send({ updatedUserAdress });
}

const patchHandlerMiddleware = yupAddressMiddleware(patchHandler);

const handler = methods({
  patch: patchHandlerMiddleware,
});

export default authMiddleware(handler);
//

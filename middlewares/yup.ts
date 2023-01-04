import { NextApiRequest, NextApiResponse } from "next";
import parseToken from "parse-bearer-token";
import { decode } from "middlewares/jwt";
import * as yup from "yup";

let bodySchema = yup.object().shape({
  email: yup.string().email().required(),
});

export async function yupAuthMiddleware(callback: Function) {
  return function (req: NextApiRequest, res: NextApiResponse) {
    try {
      bodySchema.isValid(req.body);
      callback();
    } catch (e) {
      throw res.status(400).send({ message: "missing body" });
    }
  };
}
//

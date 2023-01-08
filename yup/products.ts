import { NextApiRequest, NextApiResponse } from "next";
import * as yup from "yup";

let querySchema = yup.object().shape({
  q: yup.string().required(),
  offset: yup.string(),
  limit: yup.string().required().strict(),
});

export function productsYupMiddleware(callback: any) {
  return async function (req: NextApiRequest, res: NextApiResponse) {
    const validity = await querySchema.isValid(req.query);
    if (validity) {
      callback(req, res);
    } else {
      throw res.status(400).send({
        message: "missing parameters in query",
      });
    }
  };
}

import { NextApiRequest, NextApiResponse } from "next";
import methods from "micro-method-router";

export default methods({
  get: function main(req: NextApiRequest, res: NextApiResponse) {
    res.json({ message: "main" });
  },
});

import type { NextApiRequest, NextApiResponse } from "next";
import { authMiddleware } from "middlewares/auth";
import methods from "micro-method-router";
import { getOffsetAndLimitFromReq } from "middlewares/pagination";
import { getResultsFromAlgolia } from "controllers/search";
import { productsYupMiddleware } from "yup/products";

async function getHandler(
  req: NextApiRequest,
  res: NextApiResponse,
  token: any
) {
  const { offset, limit } = getOffsetAndLimitFromReq(req);
  const { q } = req.query;

  const results = await getResultsFromAlgolia(q, offset, limit);

  res.send({
    results: results.hits,
    pagination: {
      offset,
      limit,
      total: results.nbHits,
    },
  });
}

const yupHandler = productsYupMiddleware(getHandler);

const handler = methods({
  get: yupHandler,
});

export default authMiddleware(handler);

import { NextApiRequest, NextApiResponse } from "next";
import { getMerchantOrder } from "lib/mercadopago";
import methods from "micro-method-router";
import { updateOrderStatus } from "controllers/ipn";

export default methods({
  async post(req: NextApiRequest, res: NextApiResponse) {
    const { id, topic } = req.query;
    console.log(id, topic);
    if (topic == "merchant_order") {
      try {
        const order = await getMerchantOrder(id);
        if (order.order_status == "paid") {
          updateOrderStatus(order.external_reference);
        }
      } catch (e: any) {
        res.status(400).send({ message: e.message });
      }
    }
    res.send("ok");
  },
});

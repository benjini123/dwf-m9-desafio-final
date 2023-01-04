import { NextApiRequest, NextApiResponse } from "next";
import { authMiddleware } from "middlewares/auth";
import { User } from "models/user";
import { getMerchantOrder } from "lib/mercadopago";
import { Order } from "models/order";
import methods from "micro-method-router";

export default methods({
  async post(req: NextApiRequest, res: NextApiResponse) {
    const { id, topic } = req.query;
    console.log(id, topic);
    if (topic == "merchant_order") {
      const order = await getMerchantOrder(id);
      if (order.order_status == "paid") {
        const orderId = order.external_reference;
        const getDbOrder = new Order(orderId);
        await getDbOrder.pull();
        getDbOrder.data.state = "cerrado";
        await getDbOrder.push();
      }
    }
    res.send("ok");
  },
});

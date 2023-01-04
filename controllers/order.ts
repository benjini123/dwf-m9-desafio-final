import { createPreference } from "lib/mercadopago";
import { Order } from "models/order";
import { Product } from "models/products";
import { User } from "models/user";

export async function handleOrder(
  userId: string,
  productId: any,
  productData: object
) {
  const product: any = await Product.checkProduct(productId);

  if (!product) {
    return console.error({ message: "product does not exist" });
  }

  const order = await Order.createNewOrder({
    productId,
    productData,
    state: "pending",
    userId,
  });

  if (!order.id) {
    return console.error({ message: "failed to create order" });
  }

  console.log("Order with id:" + order.id + " was created");

  const preference = await createPreference({
    items: [
      {
        title: product.productData.title,
        description: product.productData.description,
        picture_url: "http://www.myapp.com/myimage.jpg",
        category_id: "car_electronics",
        quantity: 1,
        currency_id: "ARS",
        unit_price: product.productData.price,
      },
    ],
    back_urls: {
      success: "https://www.google.com.ar",
      pending: "https://www.google.com.ar",
    },
    external_reference: order.id,
    notification_url: `https://dwf-m9-clase5.vercel.app/api/webhooks/mercadopago`,
  });

  console.log("preference was created");

  order.initPoint = preference.body.init_point;
  await order.push();

  return order.initPoint;
}

import joi from "joi";

export const orderSchema = joi.object({
  products: joi
    .array()
    .items(
      joi.object({
        product: joi.string().required(),
        quantity: joi.number().required(),
        price: joi.number().required(),
      }),
    )
    .min(1)
    .required(),

  address: joi.string().required(),

  totalPrice: joi.number().required(),

  paymentMethod: joi.string().valid("COD", "RAZORPAY", "STRIPE").required(),

  paymentStatus: joi.string().valid("pending", "paid").default("pending"),

  orderStatus: joi
    .string()
    .valid("pending", "shipped", "delivered")
    .default("pending"),
});

export const updateOrderStatusSchema = joi.object({
  status: joi.string().valid("pending", "shipped", "delivered").required(),
});

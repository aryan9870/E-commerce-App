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

  address: joi.object({
    firstName: joi.string().required(),
    lastName: joi.string().required(),
    email: joi.string().email().required(),
    street: joi.string().required(),
    city: joi.string().required(),
    state: joi.string().required(),
    zipCode: joi.string().required(),
    country: joi.string().required(),
    phone: joi.string().required(),
  }),

  totalPrice: joi.number().required(),

  paymentMethod: joi.string().valid("cod", "razorpay", "stripe").required(),

  paymentStatus: joi.string().valid("pending", "paid").default("pending"),

  orderStatus: joi
    .string()
    .valid("pending", "shipped", "delivered")
    .default("pending"),
});

export const updateOrderStatusSchema = joi.object({
  status: joi.string().valid("pending", "shipped", "delivered").required(),
});

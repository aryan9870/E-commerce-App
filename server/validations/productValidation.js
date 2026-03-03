import joi from "joi";

export const productSchema = joi.object({
  name: joi.string().required(),
  description: joi.string().required(),
  brand: joi.string(),
  category: joi.string().required(),
  subCategory: joi.string(),
  price: joi.number().required(),
  discountPrice: joi.number(),
  sizes: joi.array().items(joi.string()).required(),
  stock: joi.number().required(),
  isFeatured: joi.boolean().required(),
});


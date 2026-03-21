import Joi from "joi";

const cartValidation = Joi.object({
    productId: Joi.string().required(),
    quantity: Joi.number().required(),
    size: Joi.string().required(),
    color: Joi.string().required()
});

export default cartValidation;
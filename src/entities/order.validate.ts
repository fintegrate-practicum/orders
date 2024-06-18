import Joi from 'joi';
import { OrderStatus } from 'src/enums/order.enum';
import { Types } from 'mongoose';

const objectIdValidator = (value, helpers) => {
  if (!Types.ObjectId.isValid(value)) {
    return helpers.error('any.invalid');
  }
  return value;
};

export const orderValidationSchema = Joi.object({
  user: Joi.string().optional(),
  type: Joi.object({
    city: Joi.string().required(),
    street: Joi.string().required(),
    numBuild: Joi.number().required()
  }).required(),
  status: Joi.string().valid(...Object.values(OrderStatus)).required(),
  date: Joi.date().iso().required(),
  businessCode: Joi.string().required(),
  id: Joi.string().custom(objectIdValidator, 'ObjectId validation').required(),
  settingManeger: Joi.number().min(0).required().messages({
    'number.min': " must be positive",
    'any.required': "settingManeger is required"
  }),
});

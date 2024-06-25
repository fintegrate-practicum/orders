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
  user: Joi.string().min(3).max(20).required().messages({  
      'string.min': "name of user must be between at list 3 letters",
      'string.max': "name of user must be maximum 20 letters",
      'any.required': "user is required"
  }),
  type: Joi.object({
    city: Joi.string().min(3).max(20).required().messages({
    'string.min':"name of city must to be at list 3 letters",
    'string.max':"name of city must to be maximum 20 letters",
    'any.required':"city is required"
    }),
    street: Joi.string().min(3).max(15).required().messages({
      'string.min': "name of street must be at list 3 letters",
      'string.max': "name of street must be maximum 15 letters",
      'any.required': "street is required"
    }),
    numBuild: Joi.number().min(1).max(3).required().messages({
      'string.min': "numBuild must be between at list 1 letters",
      'string.max': "numBuild must be between maximum 3 letters",
      'any.required': "numBuild is required"
    })
  }).required(),
  status: Joi.string().valid(...Object.values(OrderStatus)).required(),
  date: Joi.date().iso().min(1).required().messages({
    'date.min': "min date must be positive",
    'any.required': "date is required"
  }),
  businessCode: Joi.string().min(1).max(20).required().messages({
    'string.min': "businessCode must be between at list 1 letters",
    'string.max': "businessCode must be between maximum 3 letters",
    'any.required': "businessCode is required"
  }),
  id: Joi.string().custom(objectIdValidator, 'ObjectId validation').required(),
  settingManeger: Joi.number().min(1).required().messages({
    'number.min': " must be positive",
    'any.required': "settingManeger is required"
  }),
});

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
      'string.min': "Username must contain at least 3 letters",
      'string.max': "The username must contain a maximum of 20 letters",
      'any.required': "Username is a mandatory field"
  }),
  type: Joi.object({
    city: Joi.string().min(3).max(20).required().messages({
    'string.min':"City name must contain at least 3 letters",
    'string.max':"A city name must contain at most 20 letters",
    'any.required':"The name of a city is a mandatory field"
    }),
    street: Joi.string().min(3).max(15).required().messages({
      'string.min': "A street name must contain at least 3 letters",
      'string.max': "A street name must contain at most 20 letters",
      'any.required': "Street name is a mandatory field"
    }),
    numBuild: Joi.number().min(1).max(3).required().messages({
      'string.min': "Building number must contain at least number 1",
      'string.max': "A building number must contain at most 3 letters",
      'any.required': "numBuild is required"
    })
  }).required(),
  status: Joi.string().valid(...Object.values(OrderStatus)).required(),
  date: Joi.date().iso().min(1).required().messages({
    'date.min': "Date must be positive",
    'any.required': "Date is a mandatory field"
  }),
  businessCode: Joi.string().min(1).max(20).required().messages({
    'string.min': "Business code must contain at least 1 letter",
    'string.max': "Business code must contain at most 3 letters",
    'any.required': "Business code is a mandatory field"
  }),
  id: Joi.string().custom(objectIdValidator, 'ObjectId validation').required(),
  settingManeger: Joi.number().min(1).required().messages({
    'number.min': "settingManeger must be positive",
    'any.required': "settingManeger is a mandatory field"
  }),
});

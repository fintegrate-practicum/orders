import Joi from 'joi';
import { OrderStatus } from 'src/enums/order.enum';
import { Types } from 'mongoose';

export const orderValidationSchema = Joi.object({
  userId: Joi.string().min(3).max(20).required().messages({
    'string.min': "Username must contain at least 3 letters",
    'string.max': "The username must contain a maximum of 20 letters",
    'any.required': "Username is a mandatory field"
  }),
  type: Joi.object().when('deliveryMethod', {
    is: 'delivery',
    then: Joi.object({
      city: Joi.string().min(3).max(20).required().messages({
        'string.min': "City name must contain at least 3 letters",
        'string.max': "A city name must contain at most 20 letters",
        'any.required': "The name of a city is a mandatory field"
      }),
      street: Joi.string().min(3).max(15).required().messages({
        'string.min': "A street name must contain at least 3 letters",
        'string.max': "A street name must contain at most 15 letters",
        'any.required': "Street name is a mandatory field"
      }),
      numBuild: Joi.number().min(1).required().messages({
        'number.min': "Building number must be at least 1",
        'any.required': "Building number is required"
      }),
      floor: Joi.number().required().messages({
        'any.required': "Floor is a mandatory field"
      }),
      apartmentNumber: Joi.number().required().messages({
        'any.required': "Apartment number is a mandatory field"
      }),
      lastName: Joi.string().required().messages({
        'any.required': "Last name is a mandatory field"
      })
    }).required(),
    otherwise: Joi.object().optional()
  }),
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
  settingManeger: Joi.number().min(1).required().messages({
    'number.min': "settingManeger must be positive",
    'any.required': "settingManeger is a mandatory field"
  }),
});

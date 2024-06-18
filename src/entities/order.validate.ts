import * as Joi from '@hapi/joi';
import { OrderStatus } from 'src/enums/order.enum';
import {Types} from 'mongoose';

export const orderValidationSchema = Joi.object({
  user: Joi.string().optional(),
  type: Joi.object({
    city: Joi.string().required(),
    street: Joi.string().required(),
    numBuild: Joi.number().required()
  }).required(),
  status: Joi.string().valid(...Object.values(OrderStatus)).required(),
  date: Joi.date().iso().required() ,
  businessCode: Joi.string().required(),
  id: Joi.objectId().required(),
  settingManeger: Joi.number().min(0).required().messages({
    'number.min': " must be positive",
    'any.required': "settingManeger is required"
  }),
});
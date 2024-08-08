import * as Joi from 'joi';

export const cartValidationSchema = Joi.object({
  user_id: Joi.string().required().messages({
    'any.required': 'User ID is a mandatory field',
  }),
  product_id: Joi.string().required().messages({
    'any.required': 'Product ID is a mandatory field',
  }),
  buissnes_code: Joi.string()
    .regex(/^516\d{6}$/)
    .required()
    .messages({
      'string.pattern.base':
        'Business code must be exactly 9 digits and start with "516"',
      'any.required': 'Business code is a mandatory field',
    }),
  metadata: Joi.object().optional(),
});

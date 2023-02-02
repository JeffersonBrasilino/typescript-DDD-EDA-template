import { registerAs } from '@nestjs/config';
import * as Joi from 'joi';

export const appConfig = () =>
  registerAs('app', () => {
    const values = {
      env: process.env.NODE_ENV,
      version: process.env.APP_VERSION,
      port: parseInt(process.env.APP_PORT),
      baseUrl: process.env.APP_BASE_URL,
      docsUri: process.env.APP_DOCS_URI,
    };
    const schema = Joi.object({
      env: Joi.string().valid('development', 'production', 'test', 'provision').required(),
      version: Joi.string().required(),
      port: Joi.number().required(),
      baseUrl: Joi.string().required(),
      docsUri: Joi.string().required(),
    });
    const { error } = schema.validate(values, { abortEarly: false });
    if (error) {
      throw new Error(error.message);
    }
    return values;
  });

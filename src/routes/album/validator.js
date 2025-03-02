import Joi from 'joi';
import { PayloadError } from '../../configs/response.js';

export default class AlbumValidator {
  constructor() {}

  post(payload) {
    let schema = Joi.object({
      name: Joi.string().required(),
      year: Joi.number().required(),
    });

    let result = schema.validate(payload);

    if (result.error) throw new PayloadError(result.error.message);

    return result.value;
  }

  put(payload) {
    let schema = Joi.object({
      name: Joi.string().required(),
      year: Joi.number().required(),
    });

    let result = schema.validate(payload);

    if (result.error) throw new PayloadError(result.error.message);

    return result.value;
  }
}

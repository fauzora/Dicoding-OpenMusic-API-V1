import Joi from "joi";
import { PayloadError } from "../../configs/response.js";

export default class SongValidator {
  constructor() {}

  post(payload) {
    let schema = Joi.object({
      title: Joi.string().required(),
      year: Joi.number().required(),
      genre: Joi.string().required(),
      performer: Joi.string().required(),
      duration: Joi.number(),
      albumId: Joi.string(),
    });

    let result = schema.validate(payload);

    if (result.error) throw new PayloadError(result.error.message);

    return result.value;
  }

  put(payload) {
    let schema = Joi.object({
      title: Joi.string().required(),
      year: Joi.number().required(),
      genre: Joi.string().required(),
      performer: Joi.string().required(),
      duration: Joi.number(),
      albumId: Joi.string(),
    });

    let result = schema.validate(payload);

    if (result.error) throw new PayloadError(result.error.message);

    return result.value;
  }
}

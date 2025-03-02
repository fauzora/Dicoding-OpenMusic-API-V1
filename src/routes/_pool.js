import pkg from "pg";
import common from "../configs/common.js";

let { Pool } = pkg;

export default class Pools {
  constructor() {}

  InitiatePool() {
    return new Pool({ ...common.config.postgres });
  }
}

import SongRoute from "../routes/song/index.js";
import SongHandler from "../routes/song/handler.js";
import validator from "../routes/song/validator.js";
import Pool from "../routes/_pool.js";

export default new (class Soongs {
  constructor() {}

  getPlugin() {
    return {
      name: "songs",
      register: async (server) => {
        let pool = new Pool().InitiatePool()
        let validation = new validator();
        let handler = new SongHandler(validation, pool);
        let route = new SongRoute(handler).getRoutes();
        server.route(route);
      },
    };
  }
})();

import AlbumRoute from '../routes/album/index.js';
import AlbumHandler from '../routes/album/handler.js';
import validator from '../routes/album/validator.js';
import Pool from '../routes/_pool.js';

export default new (class Albums {
  constructor() {}

  getPlugin() {
    return {
      name: 'albums',
      register: async (server) => {
        let pool = new Pool().InitiatePool();
        let validation = new validator();
        let handler = new AlbumHandler(validation, pool);
        let route = new AlbumRoute(handler).getRoutes();
        server.route(route);
      },
    };
  }
})();
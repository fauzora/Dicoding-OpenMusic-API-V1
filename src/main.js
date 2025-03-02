import Hapi from "@hapi/hapi";
import Common from "./configs/common.js";
import AlbumPlugin from "./plugins/album.js";
import { ClientError } from "./configs/response.js";

class Main {
  constructor() {
    this.hapiConf = Common.config.hapi;
  }

  async InitialServer() {
    let { host, port } = this.hapiConf;

    let server = Hapi.server({
      host,
      port,
      routes: {
        cors: {
          origin: ["*"],
        },
      },
    });

    server.ext("onPreResponse", ({ response }, h) => {
      if (response instanceof ClientError)
        return h
          .response({
            message: response.message,
            status: 'fail',
          })
          .code(response.statusCode);

      return h.continue;
    });

    await server.register([
      {
        plugin: AlbumPlugin.getPlugin(),
      },
    ]);

    return server;
  }
}

(async () => {
  let MainInstance = new Main();
  let server = await MainInstance.InitialServer();

  await server.start();
  console.log(`Server jalan di ${server.info.uri}`);
})();

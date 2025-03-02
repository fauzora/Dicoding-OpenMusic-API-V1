import Hapi from "@hapi/hapi";
import Common from "./configs/common.js";

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

    return server;
  }
}

(async () => {
  let MainInstance = new Main();
  let server = await MainInstance.InitialServer();

  await server.start();
  console.log(`Server jalan di ${server.info.uri}`);
})();

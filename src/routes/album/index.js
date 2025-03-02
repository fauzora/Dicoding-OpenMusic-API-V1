export default class Routes {
  constructor(handler) {
    this._handler = handler;
  }

  getRoutes() {
    return [
      {
        method: 'POST',
        path: '/albums',
        handler: (request, h) => {
          return this._handler.createAlbum(request, h);
        },
      },
      {
        method: 'GET',
        path: '/albums/{id}',
        handler: (request) => {
          return this._handler.getAlbumById(request);
        },
      },
      {
        method: 'PUT',
        path: '/albums/{id}',
        handler: (request) => {
          return this._handler.updateAlbumById(request);
        },
      },
      {
        method: 'DELETE',
        path: '/albums/{id}',
        handler: (request, h) => {
          return this._handler.deleteAlbumById(request, h);
        },
      },
    ];
  }
}

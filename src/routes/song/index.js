export default class Routes {
  constructor(handler) {
    this._handler = handler;
  }

  getRoutes() {
    return [
      {
        method: 'POST',
        path: '/songs',
        handler: (request, h) => {
          return this._handler.createSong(request, h);
        },
      },
      {
        method: 'GET',
        path: '/songs',
        handler: (request) => {
          return this._handler.getSongs(request);
        },
      },
      {
        method: 'GET',
        path: '/songs/{id}',
        handler: (request) => {
          return this._handler.getSongById(request);
        },
      },
      {
        method: 'PUT',
        path: '/songs/{id}',
        handler: (request) => {
          return this._handler.updateSongById(request);
        },
      },
      {
        method: 'DELETE',
        path: '/songs/{id}',
        handler: (request, h) => {
          return this._handler.deleteSongById(request, h);
        },
      },
    ];
  }
}

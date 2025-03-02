import { nanoid } from 'nanoid';
import { NotFoundError } from '../../configs/response.js';

export default class AlbumHandler {
  constructor(validator, pool) {
    this._validator = validator;
    this._pool = pool;
  }

  async createAlbum(request, h) {
    let { year, name } = request.payload;
    this._validator.post(request.payload);

    let id = `album-${nanoid(16)}`;

    let query = {
      text: 'INSERT INTO albums VALUES ($1, $2, $3) RETURNING id, name',
      values: [id, name, year],
    };

    let { rows } = await this._pool.query(query);

    let response = h
      .response({
        data: {
          albumId: rows[0].id,
        },
        message: `Berhasil membuat album ${rows[0].name}`,
        status: 'success',
      })
      .code(201);

    return response;
  }

  async getAlbumById(request) {
    let { id } = request.params;

    let query = {
      text: 'SELECT id, name, year FROM albums WHERE id = $1',
      values: [id],
    };
    let songsQuery = {
      text: 'SELECT id, title, performer FROM songs WHERE album_id = $1',
      values: [id],
    };

    let { rows } = await this._pool.query(query);

    let { rows: rowsSong } = await this._pool.query(songsQuery);

    if (!rows.length) {
      throw new NotFoundError('Album tidak ditemukan');
    }

    return {
      data: {
        album: { ...rows[0], songs: rowsSong },
      },
      message: `Album ${rows[0].name} ditemukan`,
      status: 'success',
    };
  }

  async updateAlbumById(request) {
    let { year, name } = request.payload;
    let { id } = request.params;
    this._validator.put(request.payload);

    let query = {
      text: 'UPDATE albums SET name = $1, year = $2 WHERE id = $3 RETURNING id, name, year',
      values: [name, year, id],
    };

    let { rows } = await this._pool.query(query);

    if (!rows.length) {
      throw new NotFoundError('Album tidak ditemukan');
    }

    return {
      data: {
        album: rows[0],
      },
      message: `Album ${rows[0].name} berhasil diupdate`,
      status: 'success',
    };
  }

  async deleteAlbumById(request, h) {
    let { id } = request.params;

    let query = {
      text: 'DELETE FROM albums WHERE id = $1 RETURNING id, name',
      values: [id],
    };

    let { rows } = await this._pool.query(query);

    if (!rows.length) {
      throw new NotFoundError('Album tidak ditemukan');
    }

    let response = h
      .response({
        data: {},
        message: `Berhasil menghapus album ${rows[0].name}`,
        status: 'success',
      })
      .code(200);

    return response;
  }
}

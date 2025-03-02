import { nanoid } from "nanoid";
import { NotFoundError } from "../../configs/response.js";

export default class SongHandler {
  constructor(validator, pool) {
    this._validator = validator;
    this._pool = pool;
  }

  async createSong(request, h) {
    let { title, year, genre, performer, duration, albumId } = request.payload;
    this._validator.post(request.payload);

    let id = `songs-${nanoid(16)}`;
    let query = {
      text: "INSERT INTO songs VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id, title",
      values: [id, title, year, genre, performer, duration, albumId],
    };

    let { rows } = await this._pool.query(query);

    let response = h
      .response({
        data: {
          songId: rows[0].id,
        },
        message: `Berhasil menambah lagu ${rows[0].title}`,
        status: "success",
      })
      .code(201);

    return response;
  }

  async getSongs(request) {
    let query = "SELECT id, title, performer FROM songs";

    let reqQuery = request.query;
    if (Object.keys(reqQuery).length) {
      query += ` WHERE ${Object.keys(reqQuery)
        .map((queries) => {
          return `${queries} ILIKE '%${reqQuery[queries]}%'`;
        })
        .join(" AND ")}`;
    }

    let { rows } = await this._pool.query(query);

    if (!rows.length) throw new NotFoundError("Lagu tidak ditemukan");

    return {
      data: {
        songs: rows,
      },
      message: `Lagu ${rows[0].title} ditemukan`,
      status: "success",
    };
  }

  async getSongById(request) {
    let { id } = request.params;

    let query = {
      text: "SELECT * FROM songs WHERE id = $1",
      values: [id],
    };

    let { rows } = await this._pool.query(query);

    if (!rows.length) {
      throw new NotFoundError("Lagu tidak ditemukan");
    }

    return {
      data: {
        song: rows[0],
      },
      message: `Lagu ${rows[0].name} ditemukan`,
      status: "success",
    };
  }

  async updateSongById(request) {
    let { title, year, genre, performer, duration, albumId } = request.payload;
    let { id } = request.params;
    this._validator.put(request.payload);

    let query = {
      text: "UPDATE songs SET title = $1, year = $2, genre = $3, performer = $4, duration = $5, album_id = $6 WHERE id = $7 RETURNING title",
      values: [title, year, genre, performer, duration, albumId, id],
    };

    let { rows } = await this._pool.query(query);

    if (!rows.length) {
      throw new NotFoundError("Lagu tidak ditemukan");
    }

    return {
      data: {
        song: rows[0],
      },
      message: `Lagu ${rows[0].title} berhasil diupdate`,
      status: "success",
    };
  }

  async deleteSongById(request, h) {
    let { id } = request.params;

    let query = {
      text: "DELETE FROM songs WHERE id = $1 RETURNING id, title",
      values: [id],
    };

    let { rows } = await this._pool.query(query);

    if (!rows.length) {
      throw new NotFoundError("Lagu tidak ditemukan");
    }

    let response = h
      .response({
        data: {},
        message: `Berhasil menghapus lagu ${rows[0].title}`,
        status: "success",
      })
      .code(200);

    return response;
  }
}

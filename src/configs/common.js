import dotenv from 'dotenv';

dotenv.config();

export default new class Common {
  constructor() {
    this.config = {
      hapi: {
        host: process.env.HOST,
        port: process.env.PORT,
      },
      postgres: {
        host: process.env.PGHOST,
        port: process.env.PGPORT,
        database: process.env.PGDATABASE,
        username: process.env.PGUSER,
        password: process.env.PGPASSWORD,
      },
    };
  }
};
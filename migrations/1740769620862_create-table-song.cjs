exports.up = (pgm) => {
  pgm.createTable("songs", {
    id: { type: "varchar(50)", notNull: true, primaryKey: true },
    title: { type: "varchar(255)", notNull: true },
    year: { type: "integer", notNull: true },
    genre: { type: "varchar(100)", notNull: false },
    performer: { type: "varchar(255)", notNull: true },
    duration: { type: "integer", notNull: false },
    album_id: {
      type: "varchar(50)",
      notNull: false,
      references: '"albums"(id)',
      onDelete: "CASCADE",
    },
  });
};

exports.down = (pgm) => {
  pgm.dropTable("songs");
};

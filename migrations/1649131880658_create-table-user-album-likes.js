/* eslint-disable camelcase */
exports.up = (pgm) => {
  pgm.createTable('user_album_likes', {
    id: {
      type: 'VARCHAR(100)',
      primaryKey: true,
    },
    user_id: {
      type: 'VARCHAR(100)',
      notNull: true,
    },
    album_id: {
      type: 'VARCHAR(100)',
      notNull: true,
    },
  });
};

exports.down = (pgm) => {
  pgm.dropTable('user_album_likes');
};

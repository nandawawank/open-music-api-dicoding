/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.createTable('playlist_song_activities', {
    id: {
      type: 'VARCHAR(100)',
      primaryKey: true,
    },
    song_id: {
      type: 'VARCHAR(100)',
      notNull: true,
    },
    user_id: {
      type: 'VARCHAR(100)',
      notNull: true,
    },
    action: {
      type: 'VARCHAR(50)',
      notNull: false,
    },
    time: {
      type: 'VARCHAR(50)',
      notNull: true,
    },
  });
};

exports.down = (pgm) => {};

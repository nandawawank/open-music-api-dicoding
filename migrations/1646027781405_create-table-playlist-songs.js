/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.createTable('playlist_songs',
      {
        id: {
          type: 'VARCHAR(100)',
          primaryKey: true,
        },
        playlist_id: {
          type: 'VARCHAR(100)',
          notNull: true,
          references: 'playlists',
          referencesConstraintName: 'playlist_constraint',
        },
        song_id: {
          type: 'VARCHAR(100)',
          notNull: true,
          references: 'songs',
          referencesConstraintName: 'songs_constraint',
        },
        create_at: {
          type: 'VARCHAR(50)',
          notNull: true,
        },
        update_at: {
          type: 'VARCHAR(50)',
          notNull: true,
        },
      });
};

exports.down = (pgm) => {
  pgm.dropTable('playlist_songs');
};

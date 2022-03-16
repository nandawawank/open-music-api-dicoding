/* eslint-disable camelcase */

exports.up = (pgm) => {
  pgm.createTable('users', {
    id: {
      type: 'VARCHAR(50)',
      primaryKey: true,
    },
    username: {
      type: 'VARCHAR(20)',
      unique: true,
      notNull: true,
    },
    password: {
      type: 'VARCHAR(100)',
      notNull: true,
    },
    fullname: {
      type: 'VARCHAR(100)',
    },
    token: {
      type: 'TEXT',
      default: null,
    },
    refresh_token: {
      type: 'TEXT',
      default: null,
    },
    create_at: {
      type: 'TIMESTAMP',
      notNull: true,
    },
    update_at: {
      type: 'TIMESTAMP',
      notNull: true,
    },
  });
};

exports.down = (pgm) => {
  pgm.dropTable('users');
};

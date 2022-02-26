/* eslint-disable max-len */
module.exports = {
  addPlaylist: `INSERT INTO playlists (id, "name", "owner", create_at, update_at)
    VALUES($1, $2, $3, $4, $5) RETURNING "name";`,
};

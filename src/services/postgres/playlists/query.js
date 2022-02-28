/* eslint-disable max-len */
module.exports = {
  addPlaylist: `INSERT INTO playlists (id, "name", "owner", create_at, update_at)
    VALUES($1, $2, $3, $4, $5) RETURNING id;`,
  getPlaylists: `SELECT pl.id, pl.name, us.username FROM playlists pl 
  JOIN users us ON pl.owner = us.id WHERE pl.owner = $1`,
  deletePlaylist: `DELETE FROM playlists WHERE id = $1 and owner = $2 RETURNING id`,
  addPlaylistSong: `INSERT INTO public.playlist_songs (id, playlist_id, song_id, create_at, update_at)
  VALUES($1, $2, $3, $4, $5) RETURNING id;`,
};

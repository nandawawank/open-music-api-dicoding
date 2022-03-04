/* eslint-disable max-len */
module.exports = {
  addPlaylist: `INSERT INTO playlists (id, "name", "owner", create_at, update_at)
    VALUES($1, $2, $3, $4, $5) RETURNING id;`,
  getPlaylists: `SELECT pl.id, pl.name, us.username FROM playlists pl 
  JOIN users us ON pl.owner = us.id WHERE pl.owner = $1`,
  getPlaylistById: `SELECT pl.id, pl.name, us.username FROM playlists pl 
  JOIN users us ON pl.owner = us.id WHERE pl.id = $1`,
  deletePlaylist: `DELETE FROM playlists WHERE id = $1 and owner = $2 RETURNING id`,
  addPlaylistSong: `INSERT INTO public.playlist_songs (id, playlist_id, song_id, create_at, update_at)
  VALUES($1, $2, $3, $4, $5) RETURNING id;`,
  verifyPlaylistOwner: `SELECT id, owner FROM playlists WHERE id = $1 and owner = $2`,
  getPlaylistSongs: `SELECT playlist_id, song_id FROM playlist_songs WHERE playlist_id = $1`,
  deletePlaylistSong: `DELETE FROM playlist_songs WHERE playlist_id = $1 and song_id = $2 RETURNING playlist_id`,
  verifyPlaylistById: `SELECT id, name, owner FROM playlists WHERE id = $1`,
};

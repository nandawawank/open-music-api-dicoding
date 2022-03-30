/* eslint-disable max-len */
module.exports = {
  addPlaylist: `INSERT INTO playlists (id, "name", "owner", create_at, update_at)
    VALUES($1, $2, $3, $4, $5) RETURNING id;`,
  getPlaylists: `SELECT 
      p.id, 
      p.name, 
      u.username
    FROM playlists p 
    JOIN users u ON u.id = p.owner 
    LEFT JOIN collaborations c ON p.id = c.playlist_id 
    WHERE p.owner  = $1 
    OR c.user_id = $1`,
  getPlaylistById: `SELECT pl.id, pl.name, us.username FROM playlists pl 
  JOIN users us ON pl.owner = us.id WHERE pl.id = $1`,
  deletePlaylist: `DELETE FROM playlists WHERE id = $1 and owner = $2 RETURNING id`,
  addPlaylistSong: `INSERT INTO public.playlist_songs (id, playlist_id, song_id, create_at, update_at)
  VALUES($1, $2, $3, $4, $5) RETURNING id;`,
  verifyPlaylistOwner: `SELECT id, owner FROM playlists WHERE id = $1`,
  getPlaylistSongs: `SELECT playlist_id, song_id FROM playlist_songs WHERE playlist_id = $1`,
  deletePlaylistSong: `DELETE FROM playlist_songs WHERE playlist_id = $1 and song_id = $2 RETURNING playlist_id`,
  verifyPlaylistById: `SELECT id, name, owner FROM playlists WHERE id = $1`,
};

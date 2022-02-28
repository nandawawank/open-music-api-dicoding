module.exports = {
  addSong: `INSERT INTO songs 
  VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING id`,
  getSongs: `SELECT id, title, performer FROM songs`,
  getSongById: `SELECT id, title, year, performer, genre, duration, album_id 
  FROM songs WHERE id = $1`,
  getSongByAlbumId: `SELECT id, title, year, performer, genre, duration 
  FROM songs WHERE album_id = $1`,
  putSongById: `UPDATE songs SET title = $1, year = $2, performer = $3, 
  genre = $4, duration = $5, album_id = $6, update_at = $7 where id = $8 
  RETURNING id`,
  deleteSongById: `DELETE FROM songs WHERE id = $1 RETURNING id`,
  verifySongId: `SELECT id FROM songs WHERE id = $1`,
};

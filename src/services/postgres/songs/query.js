module.exports = {
  addSong: `INSERT INTO songs 
  VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING id`,
  getSongs: `SELECT id, title, performer FROM songs`,
  getSongById: `SELECT id, title, year, performer, genre, duration, album_id 
  FROM songs WHERE id = $1`,
};

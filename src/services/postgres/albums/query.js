module.exports = {
  addAlbum: `INSERT INTO albums VALUES ($1,$2,$3,$4,$5) RETURNING id`,
  getAlbum: `SELECT id, name, year, cover_url FROM albums 
  WHERE id = $1`,
  editAlbum: `UPDATE albums SET name = $1, year = $2, update_at = $3 
  WHERE id = $4 RETURNING id`,
  deleteAlbum: `DELETE FROM albums WHERE id = $1 RETURNING id`,
  addAlbumCover: `UPDATE albums SET cover_url = $1 WHERE id = $2 RETURNING id`,
};

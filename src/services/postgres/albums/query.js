module.exports = {
  addAlbum: `INSERT INTO albums VALUES ($1,$2,$3,$4,$5) RETURNING id`,
  addLikeAlbum: `INSERT INTO user_album_likes VALUES ($1,$2,$3) RETURNING id`,
  getAlbum: `SELECT id, name, year, cover_url FROM albums 
  WHERE id = $1`,
  getAlbumLike: `SELECT COUNT(user_id) AS like FROM user_album_likes 
  WHERE album_id = $1`,
  getAlbumLikeByAlbumIdAndUserId: `SELECT * FROM user_album_likes
  WHERE album_id = $1 AND user_id = $2`,
  editAlbum: `UPDATE albums SET name = $1, year = $2, update_at = $3 
  WHERE id = $4 RETURNING id`,
  deleteAlbum: `DELETE FROM albums WHERE id = $1 RETURNING id`,
  deleteLikeAlbum: `DELETE FROM user_album_likes WHERE id = $1 RETURNING id`,
  addAlbumCover: `UPDATE albums SET cover_url = $1 WHERE id = $2 RETURNING id`,
};

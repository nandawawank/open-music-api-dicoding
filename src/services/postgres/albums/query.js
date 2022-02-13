module.exports = {
  addAlbum: `INSERT INTO albums VALUES ($1,$2,$3,$4,$5) RETURNING id`,
};

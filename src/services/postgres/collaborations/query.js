module.exports = {
  addCollaborations: `INSERT INTO collaborations
    (id, playlist_id, user_id, create_at, update_at)
    VALUES($1, $2, $3, $4, $5) RETURNING id;`,
};

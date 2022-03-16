/* eslint-disable max-len */
module.exports = {
  addCollaborations: `INSERT INTO collaborations
    (id, playlist_id, user_id, create_at, update_at)
    VALUES($1, $2, $3, $4, $5) RETURNING id;`,
  verifyCollaboration: `SELECT playlist_id, user_id FROM collaborations
    WHERE playlist_id = $1 AND user_id = $2`,
  deleteCollaborations: `DELETE FROM collaborations WHERE playlist_id = $1 AND user_id = $2 RETURNING id`,
};

/* eslint-disable max-len */
module.exports = {
  updateToken: `UPDATE users SET token = $1, update_at = $2 
    WHERE id = $3 RETURNING id`,
  updateRefreshToken: `UPDATE users SET refresh_token = $1, update_at = $2
    WHERE id = $3 RETURNING id`,
};

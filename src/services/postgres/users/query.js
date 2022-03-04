module.exports = {
  addUser: `INSERT INTO users
    (id, username, password, fullname, create_at, update_at)
    VALUES ($1, $2, $3, $4, $5, $6) RETURNING id;`,
  verifyUserCredential: `SELECT id, password 
    FROM users WHERE username = $1`,
  verifyNewUsername: `SELECT * FROM users WHERE username = $1`,
  verifyUserById: `SELECT id, username FROM users WHERE id = $1`,
};

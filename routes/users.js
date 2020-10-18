/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();


// GET Route for Log In at /login
module.exports = (db) => {
  router.get("/login", (req, res) => {

    let id = 1;
    req.session.user_id = id;


    db.query(`SELECT * FROM users;`)
      .then(data => {
        const users = data.rows;
        res.json({ users });
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  // Route for Log Out at /logout

  router.post('/logout', (req,res) => {
    req.session.user_id = null;
    res.redirect('../api/maps');
  });
  return router;
};

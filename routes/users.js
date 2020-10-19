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

  router.get("/maps/:id", (req, res) => {

    let user_id = req.session.user_id ? req.session.user_id : null;
    console.log(req.params);
    let templateVars = {
      name : null
    };

    if (user_id) {
      // Display the user's name instead of login button
      let query = ` SELECT users.name AS user_name
                    FROM users
                    WHERE users.id = $1;`

      db.query(query, [1]).then(dataQuery => {

        templateVars.name = dataQuery.rows[0].user_name;

        res.render("../views/mapViewer", templateVars);
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
    } else {
      // Display a login and a register button
        res.render("../views/mapViewer", templateVars);
    }

  });

  router.get("/maps", (req, res) => {

    let user_id = req.session.user_id ? req.session.user_id : null;
    let templateVars = {
      name : null
    };

    if (user_id) {
      // Display the user's name instead of login button && display his maps
      let query = ` SELECT users.name AS user_name
                    FROM users
                    WHERE users.id = $1;`

      db.query(query, [1]).then(dataQuery => {

        templateVars.name = dataQuery.rows[0].user_name;

        res.render("../views/maps", templateVars);
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
    } else {
      // Display a login and a register button & display all maps
        res.render("../views/maps", templateVars);
    }
  });

  router.get("/login", (req, res) => {

    let id = 1;
    req.session.user_id = id;
    res.redirect('/users/maps');
  });

  // Route for Log Out at /logout

  router.post('/logout', (req,res) => {

    req.session.user_id = null;
    res.redirect('/users/maps');
  });

  return router;
};

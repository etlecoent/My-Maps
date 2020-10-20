/*
 * All routes for Widgets are defined here
 * Since this file is loaded in server.js into api/widgets,
 *   these routes are mounted onto /widgets
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();

module.exports = (db) => {


  router.get("/maps", (req, res) => {
    let user_id = req.session.user_id ? req.session.user_id : null;

    if (user_id) {
      let query = ` SELECT maps.*
                    FROM maps
                    WHERE user_id = $1
                    GROUP BY maps.id;`;


      db.query(query, [user_id]).then(dataQuery => {
        const maps = dataQuery.rows;
        res.send(maps);
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
    } else {
      let query = ` SELECT maps.*
                    FROM maps
                    GROUP BY maps.id;`;

      db.query(query).then(dataQuery => {
        const maps = dataQuery.rows;
        res.send(maps);
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
    }
  });

  router.post('/maps', (req, res) => {
    let user_id = req.session.user_id ? req.session.user_id : null;
    if (user_id) {
      const {title, location} = req.body;
      const [lat, long] = location.split(', ');
      const titleTrim = title.trim();
      const latitude = Number(lat);
      const longitude = Number(long);
      const query = ` INSERT INTO maps (title, latitude, longitude, user_id) VALUES ($1, $2, $3, $4)
                      RETURNING *;`

      db.query(query, [titleTrim, latitude, longitude, user_id]).then(dataQuery => {

        const map_id = dataQuery.rows[0].id;
        res.redirect(`../users/maps/${map_id}`);
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
    }
  });

  router.get("/maps/:id/edit", (req, res) => {
    let user_id = req.session.user_id ? req.session.user_id : null;
    let map_id = req.params.id;

    if (user_id) {

      let query = ` SELECT maps.*
                    FROM maps
                    WHERE maps.id = $1
                    GROUP BY maps.id;`;

      db.query(query, [map_id]).then(dataQuery => {
        const maps = dataQuery.rows;
        res.send(maps);
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
    } else {
      // Display a login and a register button
        // res.render("../views/mapViewer", templateVars);
    }
  });

  router.get("/pins/maps/:id", (req, res) => {
    let user_id = req.session.user_id ? req.session.user_id : null;
    let map_id = req.params.id;
    let query = ` SELECT pins.*
                  FROM pins
                  WHERE map_id = $1
                  GROUP BY pins.id`

    db.query(query, [map_id]).then(dataQuery => {
      const pins = dataQuery.rows;
      res.send(pins);
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
  });

  router.get("/maps/:id", (req, res) => {
    let user_id = req.session.user_id ? req.session.user_id : null;
    let map_id = req.params.id;

    let query = ` SELECT maps.*
                  FROM maps
                  WHERE maps.id = $1
                  GROUP BY maps.id;`;

    db.query(query, [map_id]).then(dataQuery => {
      const maps = dataQuery.rows;
      res.send(maps);
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
  });

  router.post("/maps/:id/favorite", (req, res) => {
    let user_id = req.session.user_id ? req.session.user_id : null;
    let map_id = req.params.id;
    if (user_id) {
      let query = ` UPDATE maps
                    SET is_favorite = true
                    WHERE maps.id = $1 AND user_id = $2
                    RETURNING *`

      db.query(query, [map_id, user_id]).then(dataQuery => {

        res.redirect(`back`);
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });

    } else {
      res
        .status(401)
        .send("You must be registered or logged in to favorite this map\n").end();
    }
  });

  router.post("/maps/:id/unfavorite", (req, res) => {
    let user_id = req.session.user_id ? req.session.user_id : null;
    let map_id = req.params.id;
    if (user_id) {
      let query = ` UPDATE maps
                    SET is_favorite = false
                    WHERE maps.id = $1 AND user_id = $2
                    RETURNING *`

      db.query(query, [map_id, user_id]).then(dataQuery => {

        res.redirect(`back`);
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });

    } else {
      res
        .status(401)
        .send("You must be registered or logged in to unfavorite this map\n").end();
    }
  });

  return router;
};

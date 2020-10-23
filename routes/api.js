/*
 * All routes for Widgets are defined here
 * Since this file is loaded in server.js into api/widgets,
 *   these routes are mounted onto /widgets
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const { query } = require('express');
const express = require('express');
const router = express.Router();

module.exports = (db) => {
  router.get("/maps", (req, res) => {
    let user_id = req.session.user_id ? req.session.user_id : null;

    if (user_id) {
      let query = ` SELECT maps.*
                    FROM maps
                    GROUP BY maps.id
                    ORDER BY ABS($1 - owner_id) ASC;`;

      db.query(query, [user_id]).then(dataQuery => {
        const maps = dataQuery.rows;
        res.send({ maps, user_id });
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
        res.send({ maps, user_id });
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

      const { title, latitude: lat, longitude: long } = req.body;
      const titleTrim = title.trim();
      const latitude = Number(lat);
      const longitude = Number(long);

      const query = ` INSERT INTO maps (title, latitude, longitude, owner_id) VALUES ($1, $2, $3, $4)
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
        res.send({ maps, user_id });
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

  router.get("/maps/favoriteMaps", (req, res) => {
    let user_id = req.session.user_id ? req.session.user_id : null;

    if (user_id) {
      let query = ` SELECT maps.*
                    FROM maps
                    INNER JOIN favoriteMaps ON map_id = maps.id
                    WHERE user_id = $1;`;

      db.query(query, [user_id]).then(dataQuery => {
        let favoriteMaps = dataQuery.rows;
        res.send({ favoriteMaps, user_id });
      })
        .catch(err => {
          res
            .status(500)
            .json({ error: err.message });
        });

    } else {
      let favoriteMaps = [];
      res.send({ favoriteMaps })
    }

  });

  router.delete("/maps/:mapId/pins/:pinId", (req, res) => {
    let userId = req.session.user_id ? req.session.user_id : null;
    let mapId = req.params.mapId;
    let pinId = req.params.pinId;
    if (userId) {
      let query = `DELETE FROM pins
                  WHERE pins.id = $1;`
      db.query(query, [pinId]).then(dataQuery => {

        res.send({ message: `pin${pinId} deleted` });

      }).catch(err => {
        console.log(err)
      })
    }
  })

  router.post("/maps/:id/pins/", (req, res) => {
    let userId = req.session.user_id ? req.session.user_id : null;
    // let pinId = req.params.id;
    let id = req.params.id;
    let queriesArray = [];

    let query = `INSERT INTO pins(title, description, latitude, longitude, map_id, image_url)
                    VALUES ($1, $2, $3, $4, $5, $6);`

    for (let marker of req.body.markers) {
      const promise = db.query(query, [marker.title, marker.description, marker.lat, marker.lng, id, marker.image_url]);
      queriesArray.push(promise);
    }

    Promise.all(queriesArray).then(() => {
      res.send("okay")
    }).catch(err => {
      console.log(err)
    })
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
      res.send({ maps, user_id });
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
      let query = ` INSERT INTO favoriteMaps (user_id, map_id) VALUES ($1, $2);`

      db.query(query, [user_id, map_id]).then(dataQuery => {

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
      let query = ` DELETE
                    FROM favoriteMaps
                    WHERE map_id = $1 AND user_id = $2
                    RETURNING *;`

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


  router.get('/maps/:id/favoriteMaps', (req, res) => {
    let user_id = req.session.user_id ? req.session.user_id : null;
    let map_id = req.params.id;

    if (user_id) {
      let query = ` SELECT *
                    FROM favoriteMaps
                    WHERE map_id = $1 AND user_id = $2;`

      db.query(query, [map_id, user_id]).then(dataQuery => {
        let favoriteMaps = dataQuery.rows;
        res.send({ favoriteMaps, user_id });
      })
        .catch(err => {
          res
            .status(500)
            .json({ error: err.message });
        });

    } else {
      res
        .status(401)
        .send("You must be registered or logged in to have favorite maps\n").end();
    }
  });

  router.get("/maps/:id/contributions", (req, res) => {
    let user_id = req.session.user_id ? req.session.user_id : null;
    let map_id = req.params.id;

    if (user_id) {
      let query = ` SELECT contributions.*
                    FROM contributions
                    WHERE map_id = $1 AND user_id = $2;`

      db.query(query, [map_id, user_id]).then(dataQuery => {
        let contributions = dataQuery.rows;
        res.send({ contributions, user_id });
      })
        .catch(err => {
          res
            .status(500)
            .json({ error: err.message });
        });

    } else {
      res
        .status(401)
        .send("You must be registered or logged in to have contributions\n").end();
    }
  });

  router.post("/maps/:id/contributions", (req, res) => {
    let user_id = req.session.user_id ? req.session.user_id : null;
    let map_id = req.params.id;

    if (user_id) {
      let query = `INSERT INTO contributions (user_id, map_id) VALUES ($1, $2)`;

      db.query(query, [user_id, map_id]).then(dataQuery => {
        let contributions = dataQuery.rows;
        res.send("Contributed!");
      })
        .catch(err => {
          res
            .status(500)
            .json({ error: err.message });
        });

    } else {
      res
        .status(401)
        .send("You must be registered or logged in to have contributions\n").end();
    }
  });

  return router;
};

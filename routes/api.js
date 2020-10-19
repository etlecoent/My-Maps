/*
 * All routes for Widgets are defined here
 * Since this file is loaded in server.js into api/widgets,
 *   these routes are mounted onto /widgets
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();

module.exports = (db) => {

  router.get("/maps/:id", (req, res) => {
    let user_id = req.session.user_id ? req.session.user_id : null;
    let map_id = req.params.id;
    console.log(map_id);
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

  return router;
};

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
    // SEND THE DATA FROM THE QUERY
    let query = ` SELECT maps.*
                    FROM maps
                    WHERE owner_id = $1
                    GROUP BY maps.id;`;
    // Add favorite maps

    db.query(query, [req.session.user_id]).then(dataQuery => {
      const maps = dataQuery.rows;
      res.send(maps);
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });

  });

  return router;
};

// GET Route for maps at /maps

// GET Route for editing a map at /maps/:id/edit

// GET Route for specific map at /maps/:id

// GET Route for a new map at /maps/new
// POST Route for a new map at /maps

// POST Route for favourite a map /maps/:id/favorite
// POST Route for favourite a map /maps/:id/favorite

// POST Route for updating an existing map on /maps/:id

// POST Route for deleting an existing map on /maps/:id

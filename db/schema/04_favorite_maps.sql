-- Drop and recreate favorite_maps table

DROP TABLE IF EXISTS favorite_maps CASCADE;

CREATE TABLE favorite_maps (
  id SERIAL PRIMARY KEY NOT NULL,
  map_id INTEGER REFERENCES maps(id) ON DELETE CASCADE,
  viewer_id INTEGER REFERENCES users(id) ON DELETE CASCADE
);

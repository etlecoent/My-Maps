-- Drop and recreate favoriteMaps table

DROP TABLE IF EXISTS favoriteMaps CASCADE;
CREATE TABLE favoriteMaps (
  id SERIAL PRIMARY KEY NOT NULL,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  map_id INTEGER REFERENCES maps(id) ON DELETE CASCADE
);

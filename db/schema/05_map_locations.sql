-- Drop and recreate Map_locations table (Example)

DROP TABLE IF EXISTS map_locations CASCADE;

CREATE TABLE map_locations (
  id SERIAL PRIMARY KEY NOT NULL,
  location_id INTEGER REFERENCES pins(id) ON DELETE CASCADE,
  map_id INTEGER REFERENCES maps(id) ON DELETE CASCADE
);

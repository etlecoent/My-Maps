-- Drop and recreate Maps table

DROP TABLE IF EXISTS maps CASCADE;

CREATE TABLE maps (
  id SERIAL PRIMARY KEY NOT NULL,
  title VARCHAR(150) NOT NULL,
  longitude Decimal(9,6),
  latitude Decimal(8,6),
  owner_id INTEGER REFERENCES users(id) ON DELETE CASCADE
);

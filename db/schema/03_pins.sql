-- Drop and recreate Pins table

DROP TABLE IF EXISTS pins CASCADE;
CREATE TABLE pins (
  id SERIAL PRIMARY KEY NOT NULL,
  title VARCHAR(150),
  description TEXT,
  longitude Decimal(9,6),
  latitude Decimal(8,6),
  image_url TEXT
);



DROP DATABASE IF EXISTS hotspots;
CREATE DATABASE hotspots;

-- connect to the db (\c)
\c hotspots;

CREATE TABLE spots_users (
  id SERIAL PRIMARY KEY,
  userId INT,
  spotId INT
);

CREATE TABLE spots (
  id SERIAL PRIMARY KEY,
  name VARCHAR,
  description VARCHAR,
  rating VARCHAR,
  latitude REAL,
  longitude REAL,
  image VARCHAR
  -- yelp_id VARCHAR finish yelp TODO
);

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR,
  email VARCHAR,
  facebookId BIGINT,
  facebookAccessToken VARCHAR
);

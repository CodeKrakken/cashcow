CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  first VARCHAR(80),
  last VARCHAR(80),
  username VARCHAR(80),
  email VARCHAR(160),
  password VARCHAR(160),
  created_at TIMESTAMP
  );
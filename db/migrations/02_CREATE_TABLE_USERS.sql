CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(80),
  first VARCHAR(80),
  last VARCHAR(80),
  email VARCHAR(160),
  password VARCHAR(160),
  );
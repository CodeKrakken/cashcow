CREATE TABLE stocks (
  id SERIAL PRIMARY KEY,
  symbol VARCHAR(20),
  user_id INTEGER,
  amount INTEGER
  );
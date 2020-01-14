CREATE TABLE stocks (
  symbol VARCHAR(20),
  user_id INTEGER REFERENCES users(id),
  amount INTEGER
  );
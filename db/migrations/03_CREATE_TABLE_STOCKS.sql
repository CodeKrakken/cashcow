CREATE TABLE stocks (
  symbol VARCHAR(20),
  FOREIGN KEY (user_id) REFERENCES users (id),
  amount INTEGER,
  );
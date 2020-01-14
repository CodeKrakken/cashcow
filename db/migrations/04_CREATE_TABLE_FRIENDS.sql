CREATE TABLE friends (
  user_id INTEGER REFERENCES users(id),
  friend_id INTEGER REFERENCES users(id)
);
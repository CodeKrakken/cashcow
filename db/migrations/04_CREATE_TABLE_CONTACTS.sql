CREATE TABLE contacts (
  FOREIGN KEY (user_id) REFERENCES users (id),
  FOREIGN KEY (contact_id) REFERENCES users (id),
);
-- Create a table named "customer
CREATE TABLE customer(
  id            SERIAL          PRIMARY KEY,
  name          VARCHAR(50)     NOT NULL,
  last_name     VARCHAR(50)     NOT NULL,
  email         VARCHAR(50)     NOT NULL UNIQUE,
  password      VARCHAR(50)     NOT NULL,
  created_at    TIMESTAMP       DEFAULT CURRENT_TIMESTAMP
);

-- Create a table named "task
CREATE TABLE task(
  id            SERIAL          PRIMARY KEY,
  customer_id   INTEGER         NOT NULL,
  title         VARCHAR(50)     NOT NULL,
  description   VARCHAR(250)    NOT NULL,
  due_date      TIMESTAMP       NOT NULL,
  comment       TEXT,
  tags          TEXT[],
  file          VARCHAR(250),

  FOREIGN KEY (customer_id) REFERENCES customer(id)
);
-- Create a table named "user"
CREATE TABLE "user"(
  id            VARCHAR(32)     PRIMARY KEY,
  name          VARCHAR(50)     NOT NULL,
  last_name     VARCHAR(50)     NOT NULL,
  email         VARCHAR(50)     NOT NULL UNIQUE,
  password      VARCHAR(50)     NOT NULL,
  created_at    TIMESTAMP       DEFAULT CURRENT_TIMESTAMP
);

-- Create a table named "task"
CREATE TABLE task(
  id            VARCHAR(32)     PRIMARY KEY,
  user_id       VARCHAR(32)     NOT NULL,
  title         VARCHAR(50)     NOT NULL,
  description   VARCHAR(250)    NOT NULL,
  due_date      TIMESTAMP       NOT NULL,
  comment       TEXT,
  tags          TEXT[],
  file          VARCHAR(250),

  FOREIGN KEY (user_id) REFERENCES "user"(id)
);

-- Create a table named "history_user_task"
CREATE TABLE history_user_task(
  id            VARCHAR(32)     PRIMARY KEY,
  user_id       VARCHAR(32)     NOT NULL,
  task_id       VARCHAR(32)     NOT NULL,
  created_at    TIMESTAMP       DEFAULT CURRENT_TIMESTAMP,

  FOREIGN KEY (user_id) REFERENCES "user"(id),
  FOREIGN KEY (task_id) REFERENCES task(id)
);
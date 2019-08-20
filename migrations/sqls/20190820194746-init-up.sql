CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE users (
    id VARCHAR(80) PRIMARY KEY NOT NULL,
    first_name VARCHAR(80) NOT NULL,
    last_name VARCHAR(80) NOT NULL
);

INSERT INTO users (id, first_name, last_name)
VALUES  ('default', 'Chris', 'Langager'),
        ('susan', 'Susan', 'Winter'),
        ('jim', 'Jim', 'Bojangles'),
        ('Tom', 'Tom', 'Bombadil');


CREATE TABLE boards (
    id UUID PRIMARY KEY NOT NULL,
    owner_id VARCHAR(80) REFERENCES users(id),
    name VARCHAR(500) NOT NULL
);

CREATE TABLE todos (
    id UUID PRIMARY KEY NOT NULL,
    owner_id VARCHAR(80) REFERENCES users(id),
    text VARCHAR(500) NOT NULL,
    completed BOOLEAN NOT NULL,
    board_id UUID REFERENCES boards(id)
);

CREATE INDEX ON todos (board_id);
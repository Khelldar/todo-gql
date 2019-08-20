CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE board (
    id UUID PRIMARY KEY NOT NULL,
    name VARCHAR(500) NOT NULL
);

CREATE TABLE todos (
    id UUID PRIMARY KEY NOT NULL,
    text VARCHAR(500) NOT NULL,
    completed BOOLEAN NOT NULL,
    board_id UUID REFERENCES board(id)
);

CREATE INDEX ON todos (board_id);
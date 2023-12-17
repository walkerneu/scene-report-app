
-- USER is a reserved keyword with Postgres
-- You must use double quotes in every query that user is in:
-- ex. SELECT * FROM "user";
-- Otherwise you will have errors!
CREATE TABLE "user" (
    "id" SERIAL PRIMARY KEY,
    "username" VARCHAR (80) UNIQUE NOT NULL,
    "password" VARCHAR (1000) NOT NULL,
    "profile_picture" VARCHAR (1000) DEFAULT 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/Aiga_toiletsq_men.svg/470px-Aiga_toiletsq_men.svg.png?20210702065244',
    "bio" VARCHAR (500) DEFAULT NULL,
    "social_media_link" VARCHAR (300) DEFAULT NULL
);

CREATE TABLE "events" (
    "id" SERIAL PRIMARY KEY,
    "title" VARCHAR (150) NOT NULL,
    "description" VARCHAR (1000),
    "event_photo_url" VARCHAR (1000) NOT NULL,
    "event_time" TIMESTAMPTZ NOT NULL,
    "venue" VARCHAR (150),
    "location" VARCHAR (400),
    "creator_id" integer REFERENCES "user"
);

CREATE TABLE "genres" (
    "id" SERIAL PRIMARY KEY,
    "genre_name" VARCHAR (80) UNIQUE NOT NULL
);

CREATE TABLE "events_genres" (
    "id" SERIAL PRIMARY KEY,
    "event_id" INT REFERENCES "events",
    "genre_id" INT REFERENCES "genres"
);

CREATE TABLE "attendance" (
	"id" SERIAL PRIMARY KEY,
	"user_id" INT REFERENCES "user",
	"event_id" INT REFERENCES "events"
);



INSERT INTO "genres"
VALUES
(1, 'punk'), (2, 'electronic'), (3, 'rock'), (4, 'classical'), (5, 'experimental'), (6, 'edm'), (7, 'techno'), (8, 'pop'), (9, 'rnb'), (10, 'hip-hop'), (11, 'folk'), (12, 'house'), (13, 'blues');
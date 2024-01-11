const express = require("express");
const {
  rejectUnauthenticated,
} = require("../modules/authentication-middleware");
const pool = require("../modules/pool");
const router = express.Router();

router.get('/', async (req, res) => {
    console.log("heres req.query:", req.query)
    let connection;
    try {
    connection = await pool.connect();

    connection.query("BEGIN;");
    let eventArray = []
    if (req.query.query !== '' && req.query.genre === ''){
    const textQuery = `
    SELECT DISTINCT
    "events"."id" AS "id",
    "events"."title",
    "events"."description",
    "events"."event_photo_url",
    "events"."event_time",
    "events"."venue",
    "events"."location",
    "events"."creator_id"
    FROM "events"
    JOIN "events_genres"
    ON "events"."id"="events_genres"."event_id"
    JOIN "genres"
    ON "events_genres"."genre_id"="genres"."id"
    WHERE 
    ("title" ILIKE $1
    OR 
    "description" ILIKE $1
    OR 
    "venue" ILIKE $1) 
    AND "events"."event_time" > NOW();
    `
    const queryResult = await connection.query(textQuery, [`%${req.query.query}%`])    
    eventArray = queryResult.rows
    }
    else if (req.query.genre !== "" && req.query.query === ""){
    const genreQuery = `
    SELECT DISTINCT
    "events"."id" AS "id",
    "events"."title",
    "events"."description",
    "events"."event_photo_url",
    "events"."event_time",
    "events"."venue",
    "events"."location",
    "events"."creator_id" 
    FROM "events"
    JOIN "events_genres"
    ON "events"."id"="events_genres"."event_id"
    JOIN "genres"
    ON "events_genres"."genre_id"="genres"."id"
    WHERE "genres"."id"=$1 AND "events"."event_time" > NOW();
    `
    const genreResult = await connection.query(genreQuery, [req.query.genre])
    eventArray = genreResult.rows
    }
    else if (req.query.genre !== "" && req.query.query !== ""){
    const fullQuery = `
    SELECT DISTINCT
    "events"."id" AS "id",
    "events"."title",
    "events"."description",
    "events"."event_photo_url",
    "events"."event_time",
    "events"."venue",
    "events"."location",
    "events"."creator_id" 
    FROM "events"
    JOIN "events_genres"
    ON "events"."id"="events_genres"."event_id"
    JOIN "genres"
    ON "events_genres"."genre_id"="genres"."id"
    WHERE
    ("title" ILIKE $1
    OR 
    "description" ILIKE $1
    OR 
    "venue" ILIKE $1)
    AND 
    "genres"."id"=$2 
    AND 
    "events"."event_time" > NOW();
    `
    const fullResult = await connection.query(fullQuery, [`%${req.query.query}%`, req.query.genre])
    eventArray = fullResult.rows
    }
    connection.query("COMMIT;");
    connection.release();
    console.log("Here's event array:", eventArray)
    res.send(eventArray)
}
    catch (error) {
        console.log("Error in search router query:", err);
        connection.query("ROLLBACK;");
        connection.release();
        res.sendStatus(500);
    }
})

router.get('/all', (req, res) => {
    const query = `
    SELECT * FROM "events"
    WHERE "events"."event_time" > NOW();
    `
    pool.query(query)
        .then((result) => {
        res.send(result.rows);
        })
        .catch((err) => {
        console.log("Error in search router genre query:", err);
        res.sendStatus(500);
        });
})

module.exports = router;
const express = require("express");
const {
  rejectUnauthenticated,
} = require("../modules/authentication-middleware");
const pool = require("../modules/pool");
const router = express.Router();

router.get('/', async (req, res) => {
    console.log("heres req.query:", req.query)
    let eventArray = []
    if (req.query.query !== ''){
    const textQuery = `
    SELECT * FROM "events"
    JOIN "events_genres"
    ON "events"."id"="events_genres"."event_id"
    JOIN "genres"
    ON "events_genres"."genre_id"="genres"."id"
    WHERE 
    ("title" ILIKE $1
    OR 
    "description" ILIKE $1
    OR 
    "venue" ILIKE $1);
    `
    await pool.query(textQuery, [`%${req.query.query}%`])
    .then((result) => {
      console.log("text query result", result.rows)
      eventArray = [...eventArray, ...result.rows]
    })
    .catch((err) => {
      console.log("Error in search router text query:", err);
      res.sendStatus(500);
    });
    }
    if (req.query.genre !== ""){
    const genreQuery = `
    SELECT * FROM "events"
    JOIN "events_genres"
    ON "events"."id"="events_genres"."event_id"
    JOIN "genres"
    ON "events_genres"."genre_id"="genres"."id"
    WHERE "genres"."id"=$1;
    `
    await pool.query(genreQuery, [req.query.genre])
    .then((result) => {
      console.log("Genre query result:", result.rows)
      eventArray = [...eventArray, ...result.rows]
    })
    .catch((err) => {
      console.log("Error in search router genre query:", err);
      res.sendStatus(500);
    });
    }
    console.log("Here's event array:", eventArray)
    try {res.send(eventArray)}
    catch (error) {console.log("error:", error)}
})

router.get('/all', (req, res) => {
    const query = `
    SELECT * FROM "events"
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
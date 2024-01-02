const express = require("express");
const {
  rejectUnauthenticated,
} = require("../modules/authentication-middleware");
const pool = require("../modules/pool");
const router = express.Router();

router.get('/', (req, res) => {
    if (req.query.query !== ''){
    const textQuery = `
    SELECT * FROM "events"
    WHERE 
    ("title" ILIKE $1
    OR
    "description" ILIKE $1
    OR
    "venue" ILIKE $1);
    `
    
    }
    const genreQuery = `
    SELECT * FROM "events"
    JOIN "events_genres"
    ON "events"."id"="events_genres"."event_id"
    JOIN "genres"
    ON "events_genres"."genre_id"="genres"."id"
    WHERE "genres"."id"=$1;
    `
    pool.query(textQuery, [req.query.query])
      .then(result => {
        eventArray = result.rows
        pool.query(genreQuery, [req.query.genre])
            .then(result => {
                eventArray = [...eventArray, ...result.rows]
                res.send(eventArray);
                console.log("Search Router GET search results:", eventArray);
            })
            .catch(err => {
                console.log('Error in search router GET search:', err);
                res.sendStatus(500)
            })
            })
      .catch(err => {
        console.log('Error in search router GET search:', err);
        res.sendStatus(500)
      })
})

module.exports = router;
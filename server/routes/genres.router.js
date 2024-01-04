const express = require('express');
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');
const pool = require('../modules/pool');

const router = express.Router();

router.get('/all', (req, res) => {
    const query = `
      SELECT * FROM "genres";
    `;
    pool.query(query)
      .then(result => {
        res.send(result.rows);
        console.log(result.rows);
      })
      .catch(err => {
        console.log('Error in genres router GET all:', err);
        res.sendStatus(500)
      })
  });

router.get('/event/:id', (req, res) => {
    const query = `
      SELECT 
      "genres"."id" AS "id",
      "genres"."genre_name" 
      FROM "genres"
        JOIN "events_genres"
        ON "genres"."id"="events_genres"."genre_id"
        JOIN "events"
        ON "events_genres"."event_id"="events"."id"
        WHERE "events"."id"=$1;
    `;
    const sqlValues = [req.params.id];
    pool.query(query, sqlValues)
      .then(result => {
        res.send(result.rows);
        console.log("Event by ID genres:", result.rows);
      })
      .catch(err => {
        console.log('Error in genres router GET all:', err);
        res.sendStatus(500)
      })
  });

module.exports = router;
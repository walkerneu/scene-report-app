const express = require('express');
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');
const pool = require('../modules/pool');

const router = express.Router();

router.get('/id/:id', (req, res) => {
    const query = `
      SELECT * FROM "events"
      WHERE "id" = $1;
    `;
    pool.query(query, [req.params.id])
      .then(result => {
        res.send(result.rows);
        console.log(result.rows);
      })
      .catch(err => {
        console.log('Error in event router GET by ID:', err);
        res.sendStatus(500)
      })
  });

  router.get('/created', (req, res) => {
    const query = `
        SELECT * FROM "events"
        WHERE "creator_id" = $1
        ORDER BY "id" DESC
        LIMIT 1;
    `;
    pool.query(query, [req.user.id])
      .then(result => {
        res.send(result.rows);
        console.log("this is the recently created event", result.rows);
      })
      .catch(err => {
        console.log('Error in event router GET created:', err);
        res.sendStatus(500)
      })
  });

  router.get('/user/:id', (req, res) => {
    const query = `
      SELECT * FROM "events"
        JOIN "attendance"
            ON "events"."id"="attendance"."event_id"
        WHERE "attendance"."user_id" = $1;
    `;
    pool.query(query, [req.user.id])
      .then(result => {
        res.send(result.rows);
        console.log(result.rows);
      })
      .catch(err => {
        console.log('Error in event router GET user events:', err);
        res.sendStatus(500)
      })
  });

  router.post('/attend/:id', (req, res) => {
    const eventId = req.params.id;
    const userId = req.user.id;
    const query = `
        INSTER INTO "attendance"
            ("user_id", "event_id")
        VALUES
            ($1, $2);
    `
    const sqlValues = [userId, eventId];
    pool.query(query, sqlValues)
        .then(result => {
            res.sendStatus(201)
        })
        .catch(err => {
            console.log('Error in event router POST attendance', err);
            res.sendStatus(500)
        })
  })


module.exports = router;
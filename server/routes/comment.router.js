const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const {
    rejectUnauthenticated,
  } = require("../modules/authentication-middleware");


router.get('/all/:id', (req, res) => {
    const query = `
    SELECT * FROM "comments"
      WHERE "event_id"=$1
      ORDER BY "created_at" DESC;
  `;
pool
  .query(query, [req.params.id])
  .then((result) => {
    res.send(result.rows);
    console.log("event comments from comment router:", result.rows);
  })
  .catch((err) => {
    console.log("Error in comment router GET all comments:", err);
    res.sendStatus(500);
  });
});


router.post('/', rejectUnauthenticated, (req, res) => {
    const commentQuery = `
    INSERT INTO "comments"
            ("comment", "user_id", "username", "event_id")
        VALUES
            ($1, $2, $3, $4);
    `
    const commentValues = [req.body.comment, req.user.id, req.user.username, req.body.event]
    pool
    .query(commentQuery, commentValues)
    .then((result) => {
      res.sendStatus(201);
    })
    .catch((err) => {
      console.log("Error in comment router POST comment", err);
      res.sendStatus(500);
    });
});

module.exports = router;
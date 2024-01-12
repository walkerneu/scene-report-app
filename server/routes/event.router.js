const express = require("express");
const {
  rejectUnauthenticated,
} = require("../modules/authentication-middleware");
const pool = require("../modules/pool");

const router = express.Router();

router.get("/id/:id", (req, res) => {
  const query = `
      SELECT * FROM "events"
      WHERE "id" = $1;
    `;
  pool
    .query(query, [req.params.id])
    .then((result) => {
      res.send(result.rows);
      console.log(result.rows);
    })
    .catch((err) => {
      console.log("Error in event router GET by ID:", err);
      res.sendStatus(500);
    });
});

router.get("/user/:id", (req, res) => {
  const query = `
      SELECT
      "events"."id" AS "id",
      "events"."title",
      "events"."description",
      "events"."event_photo_url",
      "events"."event_time",
      "events"."venue",
      "events"."location",
      "events"."creator_id"
        FROM "events"
        JOIN "attendance"
            ON "events"."id"="attendance"."event_id"
        WHERE "attendance"."user_id" = $1 AND "events"."event_time" > NOW();
    `;
  pool
    .query(query, [req.user.id])
    .then((result) => {
      res.send(result.rows);
      console.log("user Events from event router:", result.rows);
    })
    .catch((err) => {
      console.log("Error in event router GET user events:", err);
      res.sendStatus(500);
    });
});

router.get("/user/all/:id", (req, res) => {
    const query = `
        SELECT * FROM "events"
          WHERE "creator_id"=$1;
      `;
    pool
      .query(query, [req.params.id])
      .then((result) => {
        res.send(result.rows);
        console.log("users created Events from event router:", result.rows);
      })
      .catch((err) => {
        console.log("Error in event router GET users created events:", err);
        res.sendStatus(500);
      });
  });

router.get("/attendees/:id", (req, res) => {
    const query = `
    SELECT
    "user"."id" AS "id",
    "user"."username",
    "user"."profile_picture"
    FROM "user"
    JOIN "attendance"
        ON "user"."id"="attendance"."user_id"
    WHERE "attendance"."event_id"=$1;
    `
    pool.query(query, [req.params.id])
    .then((result) => {
        res.send(result.rows);
        console.log("event attendees in event router:", result.rows)
    })
    .catch((error) => {
        console.log("error in event router GET attendees", error)
        res.sendStatus(500)
    })
})

router.post("/attend/:id", (req, res) => {
  const eventId = req.params.id;
  const userId = req.user.id;
  const query = `
        INSERT INTO "attendance"
            ("user_id", "event_id")
        VALUES
            ($1, $2);
    `;
  const sqlValues = [userId, eventId];
  pool
    .query(query, sqlValues)
    .then((result) => {
      res.sendStatus(201);
    })
    .catch((err) => {
      console.log("Error in event router POST attendance", err);
      res.sendStatus(500);
    });
});

router.delete("/delete/:id", (req, res) => {
  const eventId = req.params.id;
  const query = `
        DELETE FROM "events_genres"
        WHERE "event_id" = $1;
    `;
  pool
    .query(query, [eventId])
    .then((result) => {
      const query = `
            DELETE FROM "attendance"
            WHERE "event_id" = $1;
        `;
      pool
        .query(query, [eventId])
        .then((result) => {
          const query = `
                    DELETE FROM "events"
                    WHERE "id" = $1;
                `;
          pool
            .query(query, [eventId])
            .then((result) => {
              res.sendStatus(201);
            })
            .catch((err) => {
              console.log("Error in event router DELETE event", err);
              res.sendStatus(500);
            });
        })
        .catch((err) => {
          console.log("Error in event router DELETE event", err);
          res.sendStatus(500);
        });
    })
    .catch((err) => {
      console.log("Error in event router DELETE event", err);
      res.sendStatus(500);
    });
});

module.exports = router;

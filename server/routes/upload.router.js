const express = require("express");
const {
  rejectUnauthenticated,
} = require("../modules/authentication-middleware");
const pool = require("../modules/pool");
const router = express.Router();
const cloudinaryUpload = require("../modules/cloudinary.config");

router.post("/", cloudinaryUpload.single("image"), async (req, res) => {
  const eventName = req.body.eventName;
  const description = req.body.description;
  const imageUrl = req.file.path;
  const eventTime = req.body.event_time;
  const venue = req.body.venue;
  const location = req.body.location;
  const userId = req.user.id;
  const genreIdArray = req.body.genre_id.split(",");

  const eventQuery = `
    INSERT INTO "events" 
      ("title", "description", "event_photo_url", "event_time", "venue", "location", "creator_id")
      VALUES
      ($1, $2, $3, $4, $5, $6, $7)
      RETURNING "id";
  `;
  const eventValues = [eventName, description, imageUrl, eventTime, venue, location, userId];

  pool
    .query(eventQuery, eventValues)
    .then((result) => {
      // ID IS HERE!
      console.log("New Event Id:", result.rows[0].id);
      console.log("Genre ID array:", genreIdArray)
      const createdEventId = result.rows[0].id;
      // Now handle the genre reference:
      for (let genreId of genreIdArray) {
        const eventGenreQuery = `
        INSERT INTO "events_genres" 
          ("event_id", "genre_id")
          VALUES
          ($1, $2);
      `;
        const eventGenreValues = [createdEventId, genreId];

        pool
          .query(eventGenreQuery, eventGenreValues)
          .then((result) => {})
          .catch((err) => {
            // catch for second query
            console.log(err);
            res.sendStatus(500);
          });
      }
      res.send({id: createdEventId});
    })
    .catch((err) => {
      // Catch for first query
      console.log(err);
      res.sendStatus(500);
    });
});

router.put("/edit/:id", cloudinaryUpload.single("image"), async (req, res) => {
  const genreIdArray = req.body.genre_id.split(",");
  let eventPhoto;
  if (!req.file) {
    eventPhoto = req.body.event_photo_url;
  } else {
    eventPhoto = req.file.path;
  }
  console.log("here's req.file:", req.file);
  console.log("here's eventPhoto:", eventPhoto)
  const eventQuery = `
    UPDATE "events"
    SET
    "title" = $1,
    "description" = $2,
    "event_photo_url" = $3,
    "event_time" = $4,
    "venue" = $5,
    "location" = $6
    WHERE "id"=$7;
    `;
  const eventValues = [
    req.body.title,
    req.body.description,
    eventPhoto,
    req.body.event_time,
    req.body.venue,
    req.body.location,
    req.params.id,
  ];
  pool
    .query(eventQuery, eventValues)
    .then((result) => {
      const deleteQuery = `
        DELETE FROM "events_genres"
        WHERE "event_id" = $1;
        `;
      pool
        .query(deleteQuery, [req.params.id])
        .then((result) => {
            console.log("genreIdArray:", genreIdArray)
          // Now handle the genre reference:
          for (let genreId of genreIdArray) {
            const genreQuery = `
        INSERT INTO "events_genres" 
          ("event_id", "genre_id")
          VALUES
          ($1, $2);
        `;
            const genreValues = [req.params.id, genreId];
            console.log("genreValues:", genreValues)
            pool
              .query(genreQuery, genreValues)
              .then((result) => {})
              .catch((err) => {
                // catch for second query
                console.log(err);
                res.sendStatus(500);
              });
          }
        })
        .catch((err) => {
          console.log("Error in event router DELETE event", err);
          res.sendStatus(500);
        });
      res.sendStatus(201);
    })
    .catch((err) => {
      console.log("Error in event router PUT route", err);
      res.sendStatus(500);
    });
});



module.exports = router;

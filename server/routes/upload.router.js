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
  const genreIdArray = req.body.genre_id;

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
      res.sendStatus(201);
    })
    .catch((err) => {
      // Catch for first query
      console.log(err);
      res.sendStatus(500);
    });
});

module.exports = router;

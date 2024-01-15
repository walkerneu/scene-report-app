const express = require("express");
const {
  rejectUnauthenticated,
} = require("../modules/authentication-middleware");
const pool = require("../modules/pool");
const router = express.Router();
const cloudinaryUpload = require("../modules/cloudinary.config");

router.post("/", rejectUnauthenticated, cloudinaryUpload.single("image"), async (req, res) => {
  let connection;
  try {
    let imageUrl
    if (!req.file){
        imageUrl = 'https://www.shutterstock.com/image-vector/default-ui-image-placeholder-wireframes-600nw-1037719192.jpg';
    } else {
        imageUrl = req.file.path;
    }
    const eventName = req.body.eventName;
    const description = req.body.description;
    const eventTime = req.body.event_time;
    const venue = req.body.venue;
    const location = req.body.location;
    const userId = req.user.id;
    const genreIdArray = req.body.genre_id.split(",");

    connection = await pool.connect();

    connection.query("BEGIN;");

    const eventQuery = `
    INSERT INTO "events" 
      ("title", "description", "event_photo_url", "event_time", "venue", "location", "creator_id")
      VALUES
      ($1, $2, $3, $4, $5, $6, $7)
      RETURNING "id";
  `;
    const eventValues = [
      eventName,
      description,
      imageUrl,
      eventTime,
      venue,
      location,
      userId,
    ];

    const eventResult = await connection.query(eventQuery, eventValues);
    // ID IS HERE!
    console.log("New Event Id:", eventResult.rows[0].id);
    console.log("Genre ID array:", genreIdArray);
    const createdEventId = eventResult.rows[0].id;
    // Now handle the genre reference:
    for (let genreId of genreIdArray) {
      if (genreId > 0){
      const eventGenreQuery = `
        INSERT INTO "events_genres" 
          ("event_id", "genre_id")
          VALUES
          ($1, $2);
      `;
      const eventGenreValues = [createdEventId, genreId];

      await connection.query(eventGenreQuery, eventGenreValues);
      }
    }
    const attendanceQuery = `
    INSERT INTO "attendance"
      ("user_id", "event_id")
      VALUES
      ($1, $2);
    `;
    await connection.query(attendanceQuery, [req.user.id, createdEventId])
    connection.query("COMMIT;");
    connection.release();
    res.send({ id: createdEventId });
  } catch (error) {
    console.log("Error in upload router POST:", error);
    connection.query("ROLLBACK;");
    connection.release();
    res.sendStatus(500);
  }
});

router.put("/edit/:id", rejectUnauthenticated, cloudinaryUpload.single("image"), async (req, res) => {
  let connection;
  try {
    const genreIdArray = req.body.genre_id.split(",");
    let eventPhoto;
    if (!req.file) {
      eventPhoto = req.body.event_photo_url;
    } else {
      eventPhoto = req.file.path;
    }
    console.log("here's req.file:", req.file);
    console.log("here's eventPhoto:", eventPhoto);

    connection = await pool.connect();

    connection.query("BEGIN;");
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
    await connection.query(eventQuery, eventValues);
    const deleteQuery = `
        DELETE FROM "events_genres"
        WHERE "event_id" = $1;
        `;
    await connection.query(deleteQuery, [req.params.id]);
    console.log("genreIdArray:", genreIdArray);
    // Now handle the genre reference:
    for (let genreId of genreIdArray) {
      const genreQuery = `
        INSERT INTO "events_genres" 
          ("event_id", "genre_id")
          VALUES
          ($1, $2);
        `;
      const genreValues = [req.params.id, genreId];
      console.log("genreValues:", genreValues);
      await connection.query(genreQuery, genreValues);
    }
    connection.query("COMMIT;");
    connection.release();
    res.sendStatus(201);
  } catch (error) {
    console.log("Error in upload router POST:", error);
    connection.query("ROLLBACK;");
    connection.release();
    res.sendStatus(500);
  }
});

module.exports = router;

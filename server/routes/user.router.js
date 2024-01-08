const express = require('express');
const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');
const encryptLib = require('../modules/encryption');
const pool = require('../modules/pool');
const userStrategy = require('../strategies/user.strategy');
const cloudinaryUpload = require("../modules/cloudinary.config");

const router = express.Router();

// Handles Ajax request for user information if user is authenticated
router.get('/', rejectUnauthenticated, (req, res) => {
  // Send back user object from the session (previously queried from the database)
  res.send(req.user);
});

router.get('/id/:id', (req, res) => {
  const query = `
      SELECT * FROM "user"
      WHERE "id"=$1;
    `;
    pool.query(query, [req.params.id])
      .then(result => {
        res.send(result.rows);
        console.log(result.rows);
      })
      .catch(err => {
        console.log('Error in genres router GET all:', err);
        res.sendStatus(500)
      })
})

// Handles POST request with new user data
// The only thing different from this and every other post we've seen
// is that the password gets encrypted before being inserted
router.post('/register', (req, res, next) => {
  const username = req.body.username;
  const password = encryptLib.encryptPassword(req.body.password);

  const queryText = `INSERT INTO "user" (username, password)
    VALUES ($1, $2) RETURNING id`;
  pool
    .query(queryText, [username, password])
    .then(() => res.sendStatus(201))
    .catch((err) => {
      console.log('User registration failed: ', err);
      res.sendStatus(500);
    });
});

router.put('/update', cloudinaryUpload.single("image"), async (req, res) => {
  let profilePictureUrl
  if (!req.file){
    profilePictureUrl = req.body.profile_picture
  }
  else {
    profilePictureUrl = req.file.path
  }
  console.log("req.file is", req.file)
  const username = req.body.username;
  const userBio = req.body.bio;
  const socialMediaLink = req.body.social_media_link
  const userId = req.user.id;

  const queryText = `
      UPDATE "user" 
        SET "username" = $1,
            "profile_picture" = $2,
            "bio" = $3,
            "social_media_link" = $4
          WHERE "id" = $5;`;
  const queryValues = [username, profilePictureUrl, userBio, socialMediaLink, userId]
  console.log("queryValues:", queryValues);
  pool
    .query(queryText, queryValues)
    .then(() => res.sendStatus(201))
    .catch((err) => {
      console.log('User registration failed: ', err);
      res.sendStatus(500);
    });
});

// Handles login form authenticate/login POST
// userStrategy.authenticate('local') is middleware that we run on this route
// this middleware will run our POST if successful
// this middleware will send a 404 if not successful
router.post('/login', userStrategy.authenticate('local'), (req, res) => {
  res.sendStatus(200);
});

// clear all server session information about this user
router.post('/logout', (req, res) => {
  // Use passport's built-in method to log out the user
  req.logout();
  res.sendStatus(200);
});

module.exports = router;

const express = require("express");
const {
  rejectUnauthenticated,
} = require("../modules/authentication-middleware");
const pool = require("../modules/pool");
const router = express.Router();

router.get('/', (req, res) => {
    const query = `
    SELECT * FROM "events"
    `
})

module.exports = router;
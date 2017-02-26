const express = require("express")
const router = express.Router()
const low = require('lowdb');
const fileAsync = require('lowdb/lib/storages/file-async');
const db = low('data/data.json', {
  storage: fileAsync
});

module.exports = router;

router.get('/movies', function(req, res) {
  res.send("I think it worked")
})

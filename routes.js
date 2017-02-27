const express = require("express")
const router = express.Router()
const low = require('lowdb');
// const path = require('path')
const fileAsync = require('lowdb/lib/storages/file-async');
const db = low('db/db.json', {
  storage: fileAsync
});

module.exports = router;

router.get('/movies', function(req, res) {
  res.send(db)
})

router.get('/movies/edit/:title', function(req, res) {
  res.sendFile(__dirname + '/public/editMovie.html')
})

router.post('/movies', function(req, res) {
  console.log("/movies trying to post to")
  db.get('movies')
    .push(req.body)
    .write()
    .then(postedMovie => {
      console.log("/movies posted to.")
      res.status(201).send(postedMovie)
    })
    .catch(err => console.log(err))
})

router.put('/movies/:movieTitle', function(req, res) {
  console.log("/movies trying to put")
  var oldTitle = req.params.movieTitle
  oldTitle = oldTitle.slice(1, oldTitle.length)
  db.get('movies')
    .find({title: oldTitle})
    .assign(req.body)
    .write()
    .then(updatedMovie => {
      console.log(req.body)
      console.log(oldTitle)
      console.log("movies put to")
      res.status(201).send(updatedMovie)
    })
    .catch(err => console.log(err))
  console.log("movies put to")
})

router.delete('/movies/:movieTitle', function(req, res) {
  console.log("/movies trying to delete from")
  var delTitle = req.params.movieTitle
  delTitle = delTitle.slice(1, delTitle.length)
  db.get('movies')
    .remove({title: delTitle})
    .write()
    .then(delMovie => {
      console.log(delTitle)
      console.log("movies deleted from")
      res.status(204).send(delMovie)
    })
    .catch(err => console.log(err))
  console.log("movies deleted from")
})

router.get('/movies/show/:title', function(req, res) {
  res.sendFile(__dirname + '/public/showMovie.html')
})






















////

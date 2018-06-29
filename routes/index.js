var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Comics Database' });
});

/* GET Hello World page. */
router.get('/helloworld', function(req, res) {
    res.render('helloworld', { title: 'Jurassic Park' });
});

/* GET the listing page. */
router.get('/comicsList', function(req, res) {
    var db = req.db;
    var collection = db.get('comicsCollection');
    collection.find({},{},function(e,docs){
        res.render('comicsList', {
            "comicsList" : docs
        });
    });
});

/* GET the add a new user page. */
router.get('/newComic', function(req, res) {
    res.render('newComic', { title: 'Add A New Comic Book' });
});

/* POST to the Add Comic Book page */
router.post('/newComic', function(req, res) {

    // Initializing the database variable
    var db = req.db;

    // Getting form values set up by attribute names
    var bookNum = req.body.bookNum;
    var bookTitle = req.body.bookTitle;
    var seriesTitle = req.body.seriesTitle;
    var issueNum = req.body.issueNum;
    var releaseDate = req.body.releaseDate;
    var format = req.body.format;
    var signed = req.body.signed;
    var graded = req.body.graded;
    var authors = req.body.authors;
    var penciler = req.body.penciler;
    var inker = req.body.inker;
    var coverArtist = req.body.coverArtist;
    var publisher = req.body.publisher;
    var notes = req.body.notes;

    // Define which collection to use
    var collection = db.get('comicsCollection');

    // Submit to the DB
    collection.insert({
        "bookNum" : bookNum,
        "bookTitle" : bookTitle,
        "seriesTitle" : seriesTitle,
        "issueNum" : issueNum,
        "releaseDate" : releaseDate,
        "format" : format,
        "signed" : signed,
        "graded" : graded,
        "authors" : authors,
        "penciler" : penciler,
        "inker" : inker,
        "coverArtist" : coverArtist,
        "publisher" : publisher,
        "notes" : notes
    }, function (err, doc) {
        if (err) {
            // Return an error if the operation failed
            res.send("The comic book could not be successfully added to the database.");
        }
        else {
            // Otherwise, go on to the listing page
            res.redirect("comicsList");
        }
    });
});

module.exports = router;
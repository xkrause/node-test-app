var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
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

module.exports = router;
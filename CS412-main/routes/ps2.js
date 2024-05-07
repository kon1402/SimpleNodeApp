var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    res.render('ps2', {page: "home"});
});

/* GET route */
router.get('/p1', function(req, res, next) {
    res.render('ps2', {part1resp: "Happy 4/20", page: 'p1'});
});

router.get('/p2', function(req, res, next) {
    res.render('ps2', { page: 'form' });
});

/* POST route */
router.post('/p2', function(req, res, next) {
    const text = req.body.input;
    const length = text.length;
    const data = {
        text: text,
        length: length
    };

    console.log(data);
    res.render('ps2', { part2resp: data, page: 'p2' });
    // res.json(data);
});

router.get('/p3/:name', function(req, res, next) {
    const name = req.params.name;
    res.render('ps2', { part3resp: name, page: 'p3' })
});

module.exports = router;
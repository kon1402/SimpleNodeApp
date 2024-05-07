var express = require('express');
var redis = require('redis');
var router = express.Router();

router.post('/', function(req, res, next) {
    const { key } = req.body;

    redisClient.get(key, (err, data) => {
        if (err) throw err;

        if (data !== null) {
            res.json({ message: 'Retrieved from cache', data: JSON.parse(data) });
        } else {
            redisClient
        }
    })
})
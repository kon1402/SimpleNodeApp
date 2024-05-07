var express = require('express');
var redis = require('redis');
var axios = require('axios');
var router = express.Router();

var redisClient = redis.createClient();

router.post('/', function(req, res, next) {
    const { key } = req.body;

    redisClient.get(key, (err, data) => {
        if (err) throw err;

        if (data !== null) {
            res.json({ message: 'Retrieved from cache', data: JSON.parse(data), fromCache: true });
        } else {
            axios.get('/forms')
                .then(response => {
                    const responseData = response.data;
                    redisClient.setex(key, 15, JSON.stringify(responseData)); // Setting cache with 15-second timeout
                    res.json({ message: 'Retrieved from third-party API', data: responseData, fromCache: false });
                })
                .catch(error => {
                    res.status(500).json({ error: 'Internal server error' });
                });
        }
    });
});

module.exports = router;
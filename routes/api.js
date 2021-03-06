const express = require('express');
const fs = require('fs');
const restaurants = require('../data/restaurants.json');
const router = express.Router();

/* GET users listing. */
router.get('/restaurants', function(req, res) {
  res.json(restaurants);
});

router.get('/restaurants/:id', function(req, res) {
  fs.readFile(`./data/restaurants/${req.params.id}.json`, 'utf-8', (err, data) => {
    if (err) {
      res.status(err.status || 500);
      res.json({
        message: err.message,
        error: err
      });
    } else {
      res.json(JSON.parse(data));
    }
  });
});

module.exports = router;

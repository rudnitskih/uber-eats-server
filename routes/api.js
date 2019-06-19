const express = require('express');
const fs = require('fs');
const marketplaces = require('../data/marketplaces.json');
const router = express.Router();

/* GET users listing. */
router.get('/marketplaces', function(req, res) {
  res.json(marketplaces);
});

router.get('/store/:id', function(req, res) {
  fs.readFile(`./data/stores/${req.params.id}.json`, 'utf-8', (err, data) => {
    if (err) throw err;

    res.json(JSON.parse(data));
  });
});

module.exports = router;

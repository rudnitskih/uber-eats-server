const fs = require('fs');

const path = './data/marketplaces.json';

let rawdata = fs.readFileSync(path);
let marketplaces = JSON.parse(rawdata);

marketplaces.restaurants = marketplaces.feed;

marketplaces.feed = marketplaces.feed.map((feedItem) => {
  return feedItem;
});


rawdata = JSON.stringify(marketplaces, null, 2);
fs.writeFileSync(path, rawdata);

const fs = require('fs');

const path = './data/marketplaces.json';

let rawdata = fs.readFileSync(path);
let marketplaces = JSON.parse(rawdata);


marketplaces.feed = marketplaces.feed.map((feedItem) => {
  feedItem.priceBucket = feedItem.priceLevel;
  delete feedItem.priceLevel;

  return feedItem;
});

rawdata = JSON.stringify(marketplaces, null, 2);
fs.writeFileSync(path, rawdata);

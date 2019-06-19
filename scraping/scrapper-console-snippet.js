(async function () {
  let sfNuggetCount = 35;

  const marketplaceResponse = await (await fetch("https://www.ubereats.com/rtapi/eats/v2/marketplaces", {
    "credentials": "include",
    "headers": {
      "accept": "*/*",
      "accept-language": "en-GB",
      "cache-control": "max-age=0",
      "content-type": "application/json",
      "pragma": "no-cache",
      "x-csrf-token": "1559490429-01-DIwaaKdFoRukEf0mGYF6wrgNjHjmtlNoGeqPWrzShYM",
      "x-requested-with": "XMLHttpRequest"
    },
    "referrer": "https://www.ubereats.com/en-GB/stores/",
    "referrerPolicy": "no-referrer-when-downgrade",
    "body": "{\"targetLocation\":{\"latitude\":50.4372532,\"longitude\":30.506878399999998,\"reference\":\"EiNUYXJhc2l2c2thIFN0LCBLeWl2LCBVa3JhaW5lLCAwMjAwMCIuKiwKFAoSCcUwgO_6ztRAERAiA2XJ3o2yEhQKEgkFRVrhTs_UQBH-RgEX0jFJdg\",\"type\":\"google_places\",\"address\":{\"title\":\"Tarasivska Street\",\"address1\":\"Tarasivska Street\",\"city\":\"Kyiv\"}},\"hashes\":{\"stores\":\"\"},\"feed\":\"combo\",\"feedTypes\":[\"STORE\",\"SEE_ALL_STORES\"],\"feedVersion\":2}",
    "method": "POST",
    "mode": "cors"
  })).json();

  let storesUuid = marketplaceResponse.marketplace.feed.feedItems.map((feedItem) => {
    return feedItem.uuid;
  });

  // storesUuid = [storesUuid[0], storesUuid[1]];

  for (const [i, uuid] of storesUuid.entries()) {
    await fetchStoreData(uuid);
    console.log(`${i} from  ${storesUuid.length}`);
  }

  function fetchStoreData(uuid) {
    return withRandomDelay(async () => {
      sfNuggetCount++;

      const storeData = await (await fetch(`https://www.ubereats.com/rtapi/eats/v2/eater-store/${uuid}?sfNuggetCount=${sfNuggetCount}`, {
        "credentials": "include",
        "headers": {
          "accept": "*/*",
          "accept-language": "en-GB",
          "x-requested-with": "XMLHttpRequest",
          "x-uber-target-location-latitude": "50.4372532",
          "x-uber-target-location-longitude": "30.506878399999998"
        },
        "method": "GET",
        "mode": "cors"
      })).json();

      return saveToFile(storeData, `${uuid}.json`);
    });
  }

  function withRandomDelay(process) {
    return new Promise(async (resolve) => {
      setTimeout(async () => {
        await process();
        resolve();
      }, getRandomInt(1000, 3000));
    });
  }

  function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
})();



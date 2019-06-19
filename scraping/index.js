const puppeteer = require('puppeteer');

async function getPic() {
  const browser = await puppeteer.launch({
    headless: false,
    executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    args: ['--user-data-dir=/Users/dmytror/Library/Application Support/Google/Chrome/Profile 2']
  });
  const page = await browser.newPage();
  await page.setCookie()
  await page.goto('https://www.ubereats.com/uk-UA/stores/');
  await page.waitFor(1000);
  await page.$eval('#address-selection-input', el => el.value = 'Тарасівська');
  // await page.screenshot({path: 'google.png'});

  // await browser.close();
}

getPic();



const puppeteer = require('puppeteer');

export default async function(url: string, filename: string) {
  console.log('Started Getting screenshot for url: ', url);

  const browser = await puppeteer.launch();
  //Without headless
  //const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto(url);
  await page.screenshot({
    path: filename
  });

  await browser.close();

  console.log(
    'Finished screenshot creation. generated filename: ',
    filename,
    ' for url: ',
    url
  );
}

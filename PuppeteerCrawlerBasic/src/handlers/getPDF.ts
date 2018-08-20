const puppeteer = require('puppeteer');

export default async function(url: string, filename: string) {
  console.log('Started Getting PDF for url: ', url);

  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url, { waitUntil: 'networkidle2' });
  await page.pdf({ path: filename, format: 'A4' });

  await browser.close();

  console.log(
    'Finished PDF creation. generated filename: ',
    filename,
    ' for url: ',
    url
  );
}

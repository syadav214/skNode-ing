const puppeteer = require('puppeteer');
const linkChecker = require('../libs/linkChecker');
const fs = require('fs');

module.exports = async function(url, filename) {
  console.log('Started Getting html for url: ', url);

  let browser = await puppeteer.launch();
  let page = await browser.newPage();

  await page.goto(url);

  // Wait for the results page to load and display the results.
  // Below line is query selector to get all anchor tags whose are in list tags of class -item
  let _linkChecker = new linkChecker(filename);
  let resultsSelector = _linkChecker.getLinkClasses();
  await page.waitForSelector(resultsSelector);

  // Extract the results from the page.
  let links = await page.evaluate(resultsSelector => {
    let anchors = Array.from(document.querySelectorAll(resultsSelector));
    return anchors.map(anchor => {
      return `${anchor.text.trim()} - ${anchor.href.trim()}`;
    });
  }, resultsSelector);
  //console.log(links.join('\n'));

  fs.writeFile(filename, links.join('\n'), function(err, data) {
    if (err) console.log(err);
  });

  await browser.close();

  console.log(
    'Finished html creation. generated filename: ',
    filename,
    ' for url: ',
    url
  );
};

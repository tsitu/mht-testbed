(function() {
  const cheerio = require("cheerio");
  const puppeteer = require("puppeteer");

  const fileUtils = require("./modules/fileUtils");
  const bookmarkletList = [
    "analyzer",
    "loader",
    "cre",
    "crown",
    "map",
    "setup"
  ];

  /**
   * Parses datetime data from master/src/bookmarklet HTML
   * @param {string} htmlUrl
   */
  async function fetchTimestamps(htmlUrl) {
    const browser = await puppeteer.launch();

    const page = await browser.newPage();
    await page.goto(htmlUrl);

    const body = await page.content();
    await browser.close();

    const $ = cheerio.load(body);
    const result = $(".css-truncate-target [datetime]")
      .map((i, el) => $(el).text())
      .get();
    return result;
  }

  fetchTimestamps(
    // "https://github.com/tsitu/MH-Tools/tree/master/src/" //borked, un-opened folder issue?
    "https://github.com/tsitu/test-timestamp/tree/master/data"
  ).then(res => {
    const bookmarkletJson = {};
    for (let i = 0; i < bookmarkletList.length; i++) {
      bookmarkletJson[bookmarkletList[i]] = res[i];
    }
    fileUtils.saveJsonFile("data/test.json", bookmarkletJson);
  });
})();

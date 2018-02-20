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
    const browser = await puppeteer.launch({
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
      executablePath: "google-chrome-beta"
      // executablePath:
      //   "C:/Program Files (x86)/Google/Chrome/Application/chrome.exe"
    });

    const page = await browser.newPage();
    await page.goto(htmlUrl);

    const body = await page.content();
    await browser.close();

    const $ = cheerio.load(body);
    const result = $("time-ago")
      .map((i, el) => $(el).attr("title"))
      .get();
    return result;
  }

  fetchTimestamps(
    // "https://github.com/tsitu/MH-Tools/tree/master/src/"
    "https://github.com/tsitu/test-timestamp/tree/master/data"
  ).then(res => {
    const format = res.map(el => {
      const spl = el.split(", ");
      return `${spl[0]}, ${spl[1]}`;
    });
    const bookmarkletJson = {};
    for (let i = 0; i < bookmarkletList.length; i++) {
      bookmarkletJson[bookmarkletList[i]] = format[i];
    }
    fileUtils.saveJsonFile("data/test.json", bookmarkletJson);
  });
})();

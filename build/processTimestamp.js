(function() {
  const cheerio = require("cheerio");
  const puppeteer = require("puppeteer");

  const fileUtils = require("./modules/fileUtils");
  const bookmarkletList = ["modules", "deploy", "pop", "sample", "timestamp"];

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

    // Initial throwaway page: "Failed to load latest commit information"
    const initPage = await browser.newPage();
    await initPage.goto(htmlUrl);
    const initBody = await initPage.content();
    await initPage.close();

    const page = await browser.newPage();
    await page.goto(htmlUrl);
    const body = await page.content();
    await page.close();
    await browser.close();

    const $ = cheerio.load(body);
    const result = $("time-ago")
      .map((i, el) => $(el).attr("title"))
      .get();

    return result;
  }

  fetchTimestamps(
    // Page might have to be visited more than once to work...
    // "https://github.com/tsitu/MH-Tools/tree/master/src/bookmarklet"
    "https://github.com/tsitu/mht-testbed/tree/master/build"
  ).then(res => {
    const format = res.map(el => {
      const spl = el.split(", ");
      return `${spl[0]}, ${spl[1]}`;
    });
    const bookmarkletJson = {};
    for (let i = 0; i < bookmarkletList.length; i++) {
      bookmarkletJson[bookmarkletList[i]] = format[i];
    }
    console.log(bookmarkletJson);
    fileUtils.saveJsonFile("data/bookmarklet-timestamps.json", bookmarkletJson);
  });
})();

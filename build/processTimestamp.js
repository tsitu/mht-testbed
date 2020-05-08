(function () {
  const cheerio = require("cheerio");
  const puppeteer = require("puppeteer");

  const fileUtils = require("./modules/fileUtils");
  const bookmarkletList = ["modules", "deploy", "pop", "sample", "timestamp"];

  /**
   * Parses datetime data from master/src/bookmarklet HTML
   * @param {string} htmlUrl
   */
  async function fetchTimestamps(htmlUrl) {
    console.log("Initializing Puppeteer browser...");

    const browser = await puppeteer.launch({
      headless: true,
      devtools: true,
      args: [
        "--ignore-certificate-errors",
        "--no-sandbox",
        "--disable-setuid-sandbox",
        "--disable-accelerated-2d-canvas",
        "--disable-gpu"
      ],
      executablePath: "google-chrome-stable"
      // executablePath:
      //   "C:/Program Files (x86)/Google/Chrome/Application/chrome.exe"
    });

    console.log("Initialization complete. Creating incognito context...");
    const context = await browser.createIncognitoBrowserContext();
    console.log("Context created. Calling newPage...");

    // Initial throwaway page: "Failed to load latest commit information"
    const initPage = await context.newPage().catch(error => console.log(error));
    console.log("prePage1 object instantiated...");
    await initPage.goto(htmlUrl);
    console.log("prePage1 navigated to GH URL...");
    const initBody = await initPage.content();
    console.log("prePage1 content loaded...");
    await initPage.close();
    console.log("prePage1 closed...");

    const page = await context.newPage();
    console.log("Final page object instantiated...");
    await page.goto(htmlUrl);
    console.log("Final page navigated to GH URL...");
    const body = await page.content();
    console.log("Final page body acquired...");
    await page.close();
    console.log("Final page closed");
    await browser.close();
    console.log("Browser closed");

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
    console.log(res);
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

(function() {
  const request = require("request");
  const cheerio = require("cheerio");

  const fileUtils = require("./modules/fileUtils");
  const bookmarkletList = ["ayy"];
  // const bookmarkletList = [
  //   "analyzer",
  //   "loader",
  //   "cre",
  //   "crown",
  //   "map",
  //   "setup"
  // ];

  fetchTimestamps(
    // "https://github.com/tsitu/test-timestamp/tree/master/borkerino"
    // "https://github.com/tsitu/MH-Tools/tree/master/src/" //borked, un-opened folder issue?
    "https://github.com/tsitu/RubioChat/tree/master/js"
  ).then(res => {
    const bookmarkletJson = {};
    for (let i = 0; i < bookmarkletList.length; i++) {
      bookmarkletJson[bookmarkletList[i]] = res[i];
    }
    fileUtils.saveJsonFile("data/test.json", bookmarkletJson);
  });

  /**
   * Parses datetime data from master/src/bookmarklet HTML
   * @param {string} htmlUrl
   */
  function fetchTimestamps(htmlUrl) {
    return new Promise((resolve, reject) => {
      const options = {
        url: htmlUrl,
        gzip: true,
        method: "GET",
        headers: {
          Connection: "keep-alive",
          "Cache-Control": "max-age=0",
          "Upgrade-Insecure-Requests": 1,
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/64.0.3282.140 Safari/537.36",
          Accept:
            "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8",
          "Accept-Encoding": "gzip, deflate, br",
          "Accept-Language": "en-US,en;q=0.9",
          Cookie:
            "_octo=GH1.1.1321651787.1464386925; logged_in=yes; dotcom_user=tsitu; user_session=usBVfoUZraCxgDFC2Jt8lNyrI-gAU_okAMhqxc3LsNNNrX-5; __Host-user_session_same_site=usBVfoUZraCxgDFC2Jt8lNyrI-gAU_okAMhqxc3LsNNNrX-5; _ga=GA1.2.660846068.1464386926; tz=America%2FLos_Angeles; _gat=1; _gh_sess=eyJzZXNzaW9uX2lkIjoiNTQ2YmIyMWY4MDc1ZjZlMTczYmY5ZDI2OWExNzMzMDEiLCJsYXN0X3JlYWRfZnJvbV9yZXBsaWNhcyI6MTUxODYwMDM2NDE2MSwic3B5X3JlcG8iOiJ0c2l0dS9SdWJpb0NoYXQiLCJzcHlfcmVwb19hdCI6MTUxODYwMDM2NCwiY29udGV4dCI6Ii8iLCJsYXN0X3dyaXRlIjoxNTE4NTg5MTU1NzIwfQ%3D%3D--ab8ed35979be07323c9076afd2eae52015bb7053"
        }
      };
      request(options, (error, response, body) => {
        if (error) {
          reject(Error(error));
        } else if (response.statusCode !== 200) {
          reject(Error(response.statusCode));
        } else {
          const $ = cheerio.load(body);
          const result = $(".css-truncate-target [datetime]")
            .map((i, el) => $(el).text())
            .get();
          resolve(result);
        }
      });
    });
  }
})();

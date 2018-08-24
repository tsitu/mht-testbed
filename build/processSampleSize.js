const fs = require("fs");

/**
 * Returns ideal sample size for 10% relative uncertainty at 95% level
 * Formula: n = 4 * z^2 * (1 - p) / (p * x^2)
 * @param {number} p Adjusted empirical AR (e.g. 0.01 for Black Widow)
 * @returns {number}
 */
function AgrestiCoull(p) {
  return Math.ceil(4 * 1.96 * 1.96 * ((1 - p) / (p * 0.1 * 0.1)));
}

/**
 * Returns +/- margin of error at 95% level for a given empirical AR and sample size
 * Formula: z * sqrt(pq/n)
 * @param {number} p Empirical AR
 * @param {number} n Empirical sample size
 * @returns {number}
 */
function MarginOfError(p, n) {
  // 1.96 is z for an alpha of 5%
  return 1.96 * Math.sqrt((p * (1 - p)) / n);
}

/**
 * Returns normalized score for combined average raw/relative margin of errors
 * 1. Calculate average raw margin of error
 * 2. Calculate average relative error
 * 3. Average the two averages
 * 4. Divide into 100 to get an inverse normalized result (higher is better)
 * @param {object} obj Input population object (stripped of 'SampleSize' prop)
 * @param {number} sampleSize Number from 'SampleSize' prop
 * @return {number}
 */
function calculateNormalizedMoE(obj, sampleSize) {
  const keys = Object.keys(obj);
  const popNum = keys.length;
  let marginE = 0;
  let relativeE = 0;

  for (let key of keys) {
    const percent = obj[key];
    const moe = MarginOfError(percent / 100, sampleSize) * 100;
    marginE += moe;
    relativeE += (moe / percent) * 100;
  }

  const averageM = marginE / popNum;
  const averageR = relativeE / popNum;
  const overallAverage = averageM + averageR / 2;

  return +(100 / overallAverage).toFixed(2); // Inverse normalized result
}

/**
 * Returns normalized Agresti-Coull score for current sample size as compared to ideal
 * 1. Calculate average and median empirical ARs for a specific LPCC point
 * 2. (Take average of these two ARs and run thru AC or run AC thru both and average the results)
 * 3. Divide existing sample size by this 'ideal' value and multiply by 25
 * @param {object} obj Input population object (stripped of 'SampleSize' prop)
 * @param {number} sampleSize Number from 'SampleSize' prop
 * @return {number}
 */
function calculateACScore(obj, sampleSize) {
  const keys = Object.keys(obj);
  const popNum = keys.length;

  const sortedArray = [];
  let sum = 0;
  for (let key of keys) {
    sum += obj[key];
    sortedArray.push(obj[key]);
  }
  const averageAR = sum / popNum;

  // Sort from lowest to highest AR first
  sortedArray.sort((a, b) => a - b);

  // Calculate median position based on keys length
  let medianAR;
  if (popNum % 2 === 0) {
    // Average of 2 middles
    medianAR = (sortedArray[popNum / 2] + sortedArray[popNum / 2 - 1]) / 2;
  } else {
    medianAR = sortedArray[(popNum - 1) / 2];
  }

  // Average of average/median
  const averageAM = (averageAR + medianAR) / 200;
  const preIdeal1 = AgrestiCoull(averageAM);

  // AC on both and average results (1.5x greater)
  const preIdeal2 =
    AgrestiCoull(averageAR / 100) + AgrestiCoull(medianAR / 100) / 2;

  // Average both :P
  const idealSize = preIdeal1 + preIdeal2 / 2; // roughly 1.25x preIdeal1

  // Divide existing sample size into calculated 'ideal' and normalize
  return +((sampleSize / idealSize) * 25).toFixed(2);
}

/**
 * Assign a rating to the provided score
 * Threshold for acceptance is Decent or >= 15 (for Phase 1 location average)
 * @param {number} score Normalized MoE + AC Score
 * @returns {string} Rating
 */
function scoreLabel(score) {
  let rating = "";

  if (score === 0) {
    rating = "N/A";
  } else if (score < 5) {
    rating = "Very Bad";
  } else if (score < 10) {
    rating = "Bad";
  } else if (score < 15) {
    rating = "Not Good";
  } else if (score < 25) {
    rating = "Decent";
  } else if (score < 50) {
    rating = "Good";
  } else if (score < 75) {
    rating = "Great";
  } else if (score >= 75) {
    rating = "Excellent";
  }

  return rating;
}

/**
 * Parse the full population JSON file
 */
function parseJSON() {
  fs.readFile("data/populations-cre.json", "utf8", function(err, data) {
    if (err) throw err;
    let obj = JSON.parse(data);

    let overallSummaryScore = 0;
    for (let location in obj) {
      /**
       * > As of Jack's July 3rd 2018 nightly dump <
       * 1089 total LPCC combinations (839 have sample sizes and 250 don't)
       * Total sample size: 24459604
       * Min/max/average/median score for each location as well as in totality
       * Average score factors in 0's and caps scores at 100
       *  - Prevent outliers, especially from LPCC with one mouse attracted
       * Output a concise overall summary and then separate detailed breakdown by LPCC
       *
       * > Phase 1: Location minimum 0, average >= 15 <
       * Phase 2: Location minimum 15, average >= 25
       * Phase 3: Location minimum 25, average >= 40
       */

      const detailedOutput = [];
      for (let phase in obj[location]) {
        for (let cheese in obj[location][phase]) {
          for (let charm in obj[location][phase][cheese]) {
            const point = obj[location][phase][cheese][charm];
            const sampleSize = point["SampleSize"];
            const outObj = {};
            let rawScore = 0;
            let score = 0;
            if (sampleSize) {
              delete point["SampleSize"];
              rawScore = (
                calculateNormalizedMoE(point, sampleSize) +
                calculateACScore(point, sampleSize)
              ).toFixed(2);
              if (rawScore > 100) {
                score = 100; // Cap at 100 to prevent outlier skew
              } else {
                score = rawScore;
              }
            }
            outObj["rawScore"] = +rawScore;
            outObj["cappedScore"] = +score;
            outObj["rating"] = scoreLabel(score);
            outObj["lpcc"] = `${phase}, ${cheese}, ${charm}`;
            outObj["sampleSize"] = +sampleSize;
            outObj["miceCount"] = +Object.keys(point).length;
            detailedOutput.push(outObj);
          }
        }
      }

      detailedOutput.sort((a, b) => {
        return a["score"] - b["score"];
      });

      // if (location === "Fort Rox") {
      let conciseAvgScore = 0;
      let conciseAvgSize = 0;
      let conciseAvgMice = 0;
      for (let obj in detailedOutput) {
        conciseAvgScore += detailedOutput[obj]["cappedScore"];
        conciseAvgSize += detailedOutput[obj]["sampleSize"];
        conciseAvgMice += detailedOutput[obj]["miceCount"];
      }

      const locLen = Object.keys(detailedOutput).length;
      const conciseOutput = {};
      conciseOutput["Location"] = location;
      conciseOutput["Average Score"] = (conciseAvgScore / locLen).toFixed(2);
      conciseOutput["Location Rating"] = scoreLabel(conciseAvgScore / locLen);
      conciseOutput["Average Sample Size"] = (conciseAvgSize / locLen).toFixed(
        2
      );
      conciseOutput["Average Mice Count"] = (conciseAvgMice / locLen).toFixed(
        2
      );

      // console.log(detailedOutput);
      // console.log(conciseOutput);
      if (conciseAvgScore) overallSummaryScore += conciseAvgScore / locLen;
    }

    const overallSummaryAvg = (
      overallSummaryScore / Object.keys(obj).length
    ).toFixed(2);
    console.log(
      `Overall Average Score: ${overallSummaryAvg}\nOverall Rating: ${scoreLabel(
        overallSummaryAvg
      )}`
    );
    // }
  });
}

/**
 * Main IIFE
 */
(() => {
  // console.log(AgrestiCoull(0.05));
  // console.log(RelativeError(0.2095, 420));
  parseJSON();
})();

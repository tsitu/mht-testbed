window.onload = function() {
  document.querySelector("#floor-number-input").onchange = function() {
    const floorNum = +document.querySelector("#floor-number-input").value;
    if (floorNum >= 1 && floorNum <= 500) {
      document.querySelector("#eclipses-value").innerText = calculateEclipse(
        floorNum
      );
      document.querySelector("#steps-needed-value").innerText = calculateSteps(
        floorNum
      );

      const floorCache = getFloorCache(floorNum);
      if (floorCache) {
        const goldStr = floorCache[0];
        const goldVal = +goldStr.replace(/,/g, "");

        const sigilStr = floorCache[1];
        const sigilVal = +sigilStr.replace(/,/g, "");
        const sigilBoost = Math.ceil(sigilVal / 2);

        const secretStr = floorCache[2];
        const secretVal = +secretStr.replace(/,/g, "");
        const secretBoost = Math.ceil(secretVal / 2);

        document.querySelector(
          ".valourRiftPopupClaim-cacheLoot.gold"
        ).childNodes[2].textContent = `${goldVal / 1000}k`;
        document.querySelector("#gold-value").innerText = `${goldStr} Gold`;

        if (
          document
            .querySelector(".valourRiftPopup-augmentation.hr")
            .className.indexOf("inactive") < 0
        ) {
          // Sigil Hunter Active
          document.querySelector(
            ".valourRiftPopupClaim-cacheLoot.sigils"
          ).childNodes[2].textContent = sigilVal + sigilBoost;
          document.querySelector("#sigil-value").innerText = `${sigilVal +
            sigilBoost} Tower Sigils\n(${sigilVal} from floor)\n(${sigilBoost} from augmentation)`;
        } else {
          document.querySelector(
            ".valourRiftPopupClaim-cacheLoot.sigils"
          ).childNodes[2].textContent = sigilStr;
          document.querySelector(
            "#sigil-value"
          ).innerText = `${sigilStr} Tower Sigils`;
        }

        if (
          document
            .querySelector(".valourRiftPopup-augmentation.sr")
            .className.indexOf("inactive") < 0
        ) {
          // Secret Research Active
          document.querySelector(
            ".valourRiftPopupClaim-cacheLoot.secrets"
          ).childNodes[2].textContent = secretVal + secretBoost;
          document.querySelector("#secret-value").innerText = `${secretVal +
            secretBoost} Tower Secrets\n(${secretVal} from floor)\n(${secretBoost} from augmentation)`;
        } else {
          document.querySelector(
            ".valourRiftPopupClaim-cacheLoot.secrets"
          ).childNodes[2].textContent = secretStr;
          document.querySelector(
            "#secret-value"
          ).innerText = `${secretStr} Tower Secrets`;
        }
      } else {
        document.querySelector(
          ".valourRiftPopupClaim-cacheLoot.gold"
        ).childNodes[2].textContent = 0;
        document.querySelector("#gold-value").innerText = "0 Gold";

        document.querySelector(
          ".valourRiftPopupClaim-cacheLoot.sigils"
        ).childNodes[2].textContent = 0;
        document.querySelector("#sigil-value").innerText = "0 Tower Sigils";

        document.querySelector(
          ".valourRiftPopupClaim-cacheLoot.secrets"
        ).childNodes[2].textContent = 0;
        document.querySelector("#secret-value").innerText = "0 Tower Secrets";
      }
    }
  };

  document.querySelectorAll(".valourRiftPopup-augmentation").forEach(el => {
    el.onclick = function() {
      el.classList.toggle("inactive");
      el.classList.toggle("active");
      document.querySelector("#floor-number-input").onchange();
    };
  });
};

/**
 * Recursive function that calculates required steps to reach a specified floor
 * @param {number} floorNum
 */
function calculateSteps(floorNum) {
  let reqSteps = 0;
  const prestige = calculateEclipse(floorNum);
  const floorLen = 20 + prestige * 10;
  const floorType = (floorNum - 1) % 8;

  if (floorType === 0 && prestige >= 1) {
    reqSteps += 1;
  } else if (floorNum > 1) {
    reqSteps += floorLen;
  }

  if (floorNum > 1) {
    reqSteps += calculateSteps(floorNum - 1);
  }

  return reqSteps;
}

/**
 * Calculates defeated Eclipses at a specified floor
 * @param {number} floorNum
 */
function calculateEclipse(floorNum) {
  return Math.floor((floorNum - 1) / 8);
}

function getFloorCache(floorNum) {
  const data = [
    ["0", "0", "0"],
    ["9,000", "7", "0"],
    ["18,000", "16", "0"],
    ["27,000", "24", "0"],
    ["34,000", "32", "0"],
    ["41,000", "40", "0"],
    ["46,000", "48", "0"],
    ["47,000", "50", "0"],
    ["59,000", "59", "8"],
    ["70,000", "69", "10"],
    ["81,000", "80", "11"],
    ["91,000", "88", "13"],
    ["102,000", "98", "14"],
    ["113,000", "107", "16"],
    ["123,000", "118", "17"],
    ["124,000", "120", "17"],
    ["139,000", "135", "20"],
    ["153,000", "150", "22"],
    ["168,000", "165", "24"],
    ["183,000", "182", "26"],
    ["198,000", "199", "28"],
    ["212,000", "217", "31"],
    ["227,000", "235", "33"],
    ["228,000", "254", "33"],
    ["247,000", "272", "37"],
    ["266,000", "290", "40"],
    ["285,000", "308", "43"],
    ["304,000", "325", "45"],
    ["323,000", "342", "48"],
    ["342,000", "357", "51"],
    ["361,000", "372", "54"],
    ["363,000", "386", "54"],
    ["386,000", "399", "60"],
    ["409,000", "410", "63"],
    ["432,000", "421", "66"],
    ["456,000", "430", "70"],
    ["479,000", "439", "73"],
    ["503,000", "446", "77"],
    ["527,000", "453", "80"],
    ["529,000", "459", "80"],
    ["557,000", "464", "88"],
    ["585,000", "469", "92"],
    ["613,000", "473", "96"],
    ["641,000", "477", "101"],
    ["669,000", "480", "105"],
    ["698,000", "482", "109"],
    ["726,000", "485", "113"],
    ["729,000", "487", "113"],
    ["761,000", "489", "123"],
    ["794,000", "490", "128"],
    ["827,000", "492", "133"],
    ["860,000", "493", "138"],
    ["894,000", "494", "143"],
    ["927,000", "495", "148"],
    ["961,000", "495", "153"],
    ["964,000", "496", "153"],
    ["1,002,000", "497", "161"],
    ["1,040,000", "497", "167"],
    ["1,078,000", "497", "173"],
    ["1,116,000", "498", "178"],
    ["1,155,000", "498", "184"],
    ["1,193,000", "498", "190"],
    ["1,232,000", "499", "196"],
    ["1,236,000", "500", "196"],
    ["1,279,000", "500", "205"],
    ["1,322,000", "500", "212"],
    ["1,366,000", "500", "218"],
    ["1,410,000", "500", "224"],
    ["1,454,000", "500", "231"],
    ["1,498,000", "500", "237"],
    ["1,542,000", "500", "244"],
    ["1,547,000", "500", "244"],
    ["1,595,000", "500", "253"],
    ["1,644,000", "500", "260"],
    ["1,694,000", "500", "267"],
    ["1,743,000", "500", "274"],
    ["1,793,000", "500", "282"],
    ["1,843,000", "500", "289"],
    ["1,893,000", "500", "296"],
    ["1,898,000", "500", "300"],
    ["1,952,000", "500", "300"],
    ["2,007,000", "500", "300"],
    ["2,062,000", "500", "300"],
    ["2,117,000", "500", "300"],
    ["2,173,000", "500", "300"],
    ["2,229,000", "500", "300"],
    ["2,285,000", "500", "300"],
    ["2,291,000", "500", "300"],
    ["2,351,000", "500", "300"],
    ["2,412,000", "500", "300"],
    ["2,473,000", "500", "300"],
    ["2,535,000", "500", "300"],
    ["2,597,000", "500", "300"],
    ["2,659,000", "500", "300"],
    ["2,721,000", "500", "300"],
    ["2,727,000", "500", "300"],
    ["2,794,000", "500", "300"],
    ["2,862,000", "500", "300"],
    ["2,929,000", "500", "300"],
    ["2,997,000", "500", "300"],
    ["3,065,000", "500", "300"],
    ["3,133,000", "500", "300"],
    ["3,202,000", "500", "300"],
    ["3,210,000", "500", "300"],
    ["3,283,000", "500", "300"],
    ["3,357,000", "500", "300"],
    ["3,431,000", "500", "300"],
    ["3,505,000", "500", "300"],
    ["3,580,000", "500", "300"],
    ["3,655,000", "500", "300"],
    ["3,730,000", "500", "300"],
    ["3,739,000", "500", "300"],
    ["3,819,000", "500", "300"],
    ["3,900,000", "500", "300"],
    ["3,980,000", "500", "300"],
    ["4,062,000", "500", "300"],
    ["4,143,000", "500", "300"],
    ["4,225,000", "500", "300"],
    ["4,307,000", "500", "300"],
    ["4,317,000", "500", "300"],
    ["4,404,000", "500", "300"],
    ["4,491,000", "500", "300"],
    ["4,579,000", "500", "300"],
    ["4,667,000", "500", "300"],
    ["4,756,000", "500", "300"],
    ["4,845,000", "500", "300"],
    ["4,934,000", "500", "300"],
    ["4,945,000", "500", "300"],
    ["5,040,000", "500", "300"],
    ["5,134,000", "500", "300"],
    ["5,229,000", "500", "300"],
    ["5,325,000", "500", "300"],
    ["5,421,000", "500", "300"],
    ["5,517,000", "500", "300"],
    ["5,613,000", "500", "300"],
    ["5,626,000", "500", "300"],
    ["5,727,000", "500", "300"],
    ["5,830,000", "500", "300"],
    ["5,932,000", "500", "300"],
    ["6,035,000", "500", "300"],
    ["6,138,000", "500", "300"],
    ["6,242,000", "500", "300"],
    ["6,346,000", "500", "300"],
    ["6,360,000", "500", "300"],
    ["6,469,000", "500", "300"],
    ["6,579,000", "500", "300"],
    ["6,689,000", "500", "300"],
    ["6,800,000", "500", "300"],
    ["6,911,000", "500", "300"],
    ["7,023,000", "500", "300"],
    ["7,135,000", "500", "300"],
    ["7,150,000", "500", "300"],
    ["7,267,000", "500", "300"],
    ["7,385,000", "500", "300"],
    ["7,503,000", "500", "300"],
    ["7,622,000", "500", "300"],
    ["7,741,000", "500", "300"],
    ["7,860,000", "500", "300"],
    ["7,980,000", "500", "300"],
    ["7,996,000", "500", "300"],
    ["8,122,000", "500", "300"],
    ["8,248,000", "500", "300"],
    ["8,374,000", "500", "300"],
    ["8,501,000", "500", "300"],
    ["8,628,000", "500", "300"],
    ["8,756,000", "500", "300"],
    ["8,884,000", "500", "300"],
    ["8,902,000", "500", "300"],
    ["9,036,000", "500", "300"],
    ["9,170,000", "500", "300"],
    ["9,305,000", "500", "300"],
    ["9,440,000", "500", "300"],
    ["9,576,000", "500", "300"],
    ["9,712,000", "500", "300"],
    ["9,849,000", "500", "300"],
    ["9,868,000", "500", "300"],
    ["10,011,000", "500", "300"],
    ["10,154,000", "500", "300"],
    ["10,297,000", "500", "300"],
    ["10,441,000", "500", "300"],
    ["10,585,000", "500", "300"],
    ["10,730,000", "500", "300"],
    ["10,875,000", "500", "300"],
    ["10,897,000", "500", "300"],
    ["11,048,000", "500", "300"],
    ["11,200,000", "500", "300"],
    ["11,352,000", "500", "300"],
    ["11,505,000", "500", "300"],
    ["11,658,000", "500", "300"],
    ["11,811,000", "500", "300"],
    ["11,966,000", "500", "300"],
    ["11,989,000", "500", "300"],
    ["12,149,000", "500", "300"],
    ["12,310,000", "500", "300"],
    ["12,471,000", "500", "300"],
    ["12,633,000", "500", "300"],
    ["12,795,000", "500", "300"],
    ["12,958,000", "500", "300"],
    ["13,122,000", "500", "300"],
    ["13,147,000", "500", "300"]
  ];

  if (floorNum >= 1 && floorNum <= data.length) {
    return data[floorNum - 1];
  } else {
    return undefined;
  }
}

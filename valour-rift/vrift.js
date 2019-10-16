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
    ["36,000", "32", "0"],
    ["45,000", "40", "0"],
    ["54,000", "48", "0"],
    ["63,000", "50", "0"],
    ["72,000", "59", "18"],
    ["81,000", "69", "20"],
    ["90,000", "80", "22"],
    ["99,000", "88", "24"],
    ["108,000", "98", "26"],
    ["117,000", "107", "28"],
    ["126,000", "118", "30"],
    ["135,000", "120", "32"],
    ["144,000", "135", "34"],
    ["157,500", "150", "36"],
    ["171,000", "165", "38"],
    ["184,500", "182", "40"],
    ["198,000", "199", "42"],
    ["211,500", "217", "44"]
  ];

  if (floorNum >= 1 && floorNum <= data.length) {
    return data[floorNum - 1];
  } else {
    return undefined;
  }
}

# :mouse: [MH Tools](https://tsitu.github.io/MH-Tools/) &middot; [![Build Status](https://travis-ci.org/tsitu/MH-Tools.svg?branch=master)](https://travis-ci.org/tsitu/MH-Tools)

Suite of JavaScript tools for the browser game [MouseHunt](https://www.mousehuntgame.com/).

Ongoing forum discussion thread [here](https://www.mousehuntgame.com/forum/showthread.php?132397-MouseHunt-Tools-by-tsitu&goto=newpost).

Feel free to post your questions, comments, or concerns there (or [here](https://github.com/tsitu/MH-Tools/issues) on GitHub Issues).

## :book: Table of Contents

- [Instructions](#instructions)
  - [General Tips](#thought_balloon-general-tips)
  - [Bookmarklets](#bookmark-bookmarklets)
    - [Browser Installation Tips](#Browser-Tips)
    - [Chrome](#Chrome)
    - [Firefox](#Firefox)
    - [Edge](#Edge)
    - [Safari](#Safari)
  - [Catch Rate Estimator](#straight_ruler-catch-rate-estimator--link)
  - [Map Solver and Mouse Finder](#earth_americas-map-solver-and-mouse-finder--link)
  - [Best Setup](#trophy-best-setup--link)
  - [Marketplace Analyzer](#chart_with_upwards_trend-marketplace-analyzer--link)
  - [Crown Solver](#crown-crown-solver-link)
  - [CRE Tabbed Demo](#bookmark_tabs-cre-tabbed-demo--link)
- [Developers](#developers)
  - [Build](#construction_worker-build)
  - [Coding Style](#barber-coding-style)
- [Miscellaneous](#miscellaneous)
  - [Useful Links](#arrow_down-useful-links)
  - [Thanks](#heart_decoration-thanks-to)

## Instructions
### :thought_balloon: General Tips

Several of the tools make use of mottie's tablesorter plugin, which has several keyboard shortcuts and additional features which may be useful, like multi-column sorting with SHIFT and special characters for filtering.

### :bookmark: Bookmarklets

Bookmarklets are pieces of JavaScript code that are saved as a bookmark in the user's browser, enabling them to interact with webpages on the fly. We provide 6 different bookmarklets (CRE, Setup, Map, Analyzer, Crown, and the all-in-one Loader), each located underneath the title of its corresponding tool's page.

You **must** be on the official [mousehuntgame.com](https://www.mousehuntgame.com/) website for our bookmarklets to work. This is because the Facebook version loads MouseHunt in an `<iframe>` which prevents access to DOM elements and the custom `user` object in JavaScript.

We recommend using the Auto-Loader, as it automatically grabs the latest version of each bookmarklet without having to manually update.

<p align="center">
  <img src="resources/img/instructions-autoloader.jpg">
  <br><i>Auto-Loader v1.1</i>
</p>

Type | Functionality
-- | --
CRE | Fills in your location, sublocation, cheese, charm, weapon, base, charm, and more
Setup | Gradually loads in your owned weapons, bases, and charms by passing them in via URL over multiple redirects
Analyzer | Gradually loads in your entire Marketplace transaction history via URL over multiple redirects
Map | Fills in the `textarea` with all of the remaining uncaught mice on your 'Active Map'
Crown | Fills in the `textarea` with the 30 Bronze mice on your 'King's Crowns' page that are closest to reaching Silver status (100 catches). The rest of the Bronze mice should be copied to your clipboard for pasting if desired.
Loader | Creates a pop-up that enables you to use the latest versions of each bookmarklet

<div style="text-align: right"><a href="#book-table-of-contents">Top</a></div>

<p align="center">
  <br><b id="Browser-Tips">Browser Installation Tips</b><br>
  Drag the blue bookmarklet link to your browser's bookmarks bar. If that doesn't work, try the following manual instructions. These concepts apply to other browsers (including mobile), but processes may vary.<br><br>
  <img src="https://cdnjs.cloudflare.com/ajax/libs/browser-logos/45.3.0/archive/chrome_12-48/chrome_12-48_32x32.png" alt="Chrome" id="Chrome"><br>
  <i>Chrome</i><br>
</p>

1. Bookmark an arbitrary page and name it something memorable, like 'CRE' or 'Auto-Loader'.
1. Copy the bookmarklet code by right-clicking the link and selecting `Copy link address`
1. Right-click on your newly created bookmark and select `Edit...`
1. Paste the bookmarklet code into the `URL` field and hit `Save`

<p align="center">
  <br><img src="https://cdnjs.cloudflare.com/ajax/libs/browser-logos/45.3.0/archive/firefox_23-56/firefox_23-56_32x32.png" alt="Firefox" id="Firefox"><br>
  <i>Firefox</i><br>
</p>

1. Right-click on the bookmarklet link, select `Bookmark This Link`, and name it accordingly.

<p align="center">
  <br><img src="https://cdnjs.cloudflare.com/ajax/libs/browser-logos/45.3.0/edge/edge_32x32.png" alt="Edge" id="Edge"> <img src="https://cdnjs.cloudflare.com/ajax/libs/browser-logos/45.3.0/archive/internet-explorer_9-11/internet-explorer_9-11_32x32.png" alt="Edge" id="Edge"><br>
  <i>Edge / IE</i><br>
</p>

1. There does not seem to be native support in Edge for saving a bookmark directly from a link or for editing a bookmark's URL (at least on my machine). Also, the 'Reading List' feature doesn't seem to work for this purpose. However, there is a third-party application for Edge called [EdgeManage](http://www.emmet-gray.com/Articles/EdgeManage.html) that purports to add a lot of missing features for managing your favorites - use it at your own discretion.

1. Internet Explorer 11 allows you to drag bookmarklets directly to your favorites bar as well as right-click and `Add to favorites...`, but does not support certain JavaScript features that power ours (?).

<p align="center">
  <br><img src="https://cdnjs.cloudflare.com/ajax/libs/browser-logos/45.3.0/archive/safari_1-7/safari_1-7_32x32.png" alt="Safari" id="Safari"><br>
  <i>Safari</i><br>
</p>

1. Bookmark an arbitrary page and name it accordingly.
1. Right-click on the bookmarklet link and select `Copy Link`
1. Right-click on the newly created bookmark, select `Edit Address`, paste into the text box, then hit `Done`

<div style="text-align: right"><a href="#book-table-of-contents">Top</a></div>

---

### :straight_ruler: Catch Rate Estimator  ([Link](https://tsitu.github.io/MH-Tools/cre.html))

> Calculates catch rate estimates along with points, gold, rank advancement and more.

? | Sum or Average
-- | --
AR | Attraction rate for individual mice
CR | Summed attraction rate for a specific location & phase & cheese & charm
Catches | Same as Total AR, with baseline cheese attraction factored in
Gold | gold
Points | ptz
etc | etc

<div style="text-align: right"><a href="#book-table-of-contents">Top</a></div>

---

<!-- ### :earth_americas: Map Solver and Mouse Finder  ([Link](https://tsitu.github.io/MH-Tools/map.html)) -->
### :earth_americas: [Map Solver and Mouse Finder](https://tsitu.github.io/MH-Tools/map.html)

<p>Based on Chad's and <a href="http://olf.github.io/mhmapsolver/" target="_blank" rel="noopener">Olaf's</a> solvers.</p>

<p>Copy and paste mice from maps, or type names leaving a line break between each. Press <b>Enter</b> to autocomplete and <b>Tab</b> to cycle through autocomplete suggestions.</p>

Type of AR | Description
-- | --
Raw | Attraction rate for individual mice
Total | Summed attraction rate for a specific location & phase & cheese & charm
Weighted | Same as Total AR, with baseline cheese attraction factored in

<div style="text-align: right"><a href="#book-table-of-contents">Top</a></div>

---

### :trophy: Best Setup  ([Link](https://tsitu.github.io/MH-Tools/setup.html))

> Calculates the best weapon and base setup to use for a particular location, sublocation, and cheese.

This tool will be receiving optimizations in the near future to reduce its lengthy loading times and store owned items more efficiently.

<div style="text-align: right"><a href="#book-table-of-contents">Top</a></div>

---

### :chart_with_upwards_trend: Marketplace Analyzer  ([Link](https://tsitu.github.io/MH-Tools/analyzer.html))

> Provides overview of each marketplace transaction as well as a summary table with useful aggregate data.

Type | Description
-- | --
Unit | aaaa
Transaction | a
Tariff | 10% (not rounded so there's decimals)

<div style="text-align: right"><a href="#book-table-of-contents">Top</a></div>

---

### :crown: Crown Solver ([Link](https://tsitu.github.io/MH-Tools/crown.html))

> Calculates the best locations to hunt to progress towards achieving 100 catches of mouse breeds.

This spin-off of the Map Solver factors in the difference between 100 and the number of catches you currently have for a breed (e.g. all else being equal, a mouse at 99 catches is weighted more heavily than one at 80 catches).

<div style="text-align: right"><a href="#book-table-of-contents">Top</a></div>

---

### :bookmark_tabs: CRE Tabbed Demo  ([Link](https://tsitu.github.io/MH-Tools/tabs.html))

> Provides a convenient location to spin up multiple independent instances of the CRE tool. Each instance is located in its own `<iframe>` and setups can be easily copy-pasted between tabs. Great way quickly to compare multiple setups that are mostly identical.

Keyboard Shortcut | Description
-- | --
Ctrl + C, ⌘C | Copy setup link in one tab
Ctrl + V, ⌘V | Paste setup link to tab
← → | Navigate between tabs (when one is highlighted)
Tab | etc

<div style="text-align: right"><a href="#book-table-of-contents">Top</a></div>

## Developers

### :construction_worker: Build

Some files (e.g. wisdom values & populations) are generated by Travis CI when the master branch is pushed.

To build these files locally, run `npm install` then `npm run build`.

### :barber: Coding Style

We use ESLint ([`config-airbnb-base`](https://www.npmjs.com/package/eslint-config-airbnb-base)) configured with Prettier ([`prettier/recommended`](https://prettier.io/docs/en/eslint.html#why-not-both)) to enforce consistent coding conventions.

*This is still a work in progress, along with converting the codebase to align with modern ES2015+ JavaScript best practices.*

<div style="text-align: right"><a href="#book-table-of-contents">Top</a></div>

## Miscellaneous

### :arrow_down: Useful Links

1. Marketplace Analyzer ([forum thread](https://www.mousehuntgame.com/forum/showthread.php?126255-Marketplace-Analyzer&goto=newpost))
1. Population data file ([CSV](https://github.com/tsitu/MH-Tools/blob/master/data/populations.csv) | [source](https://docs.google.com/spreadsheets/d/1Y_urUwbp7XpbL9vRV4w4uoexkIM_DbuAc5Fb1JL_u20/edit?usp=sharing))
1. Mouse Power Values ([spreadsheet](https://docs.google.com/spreadsheets/d/1cGu0eG0Fgwf-OWFAfed_tVJC0GQh-j6utxiSDdWRFZE/))
1. Mouse Wisdom Values ([spreadsheet](https://docs.google.com/spreadsheets/d/1nzD6iiHauMMwD2eHBuAyRziYJtCVnNwSYzCKbBnrRgc/edit?usp=sharing))
1. BWRift/MoPi Mouse Powers + Effectiveness ([spreadsheet](https://docs.google.com/spreadsheets/d/1pnS4UVFMUndjX2H2s6hfyf5flMcppZyhZrn8EUH23S8/edit?usp=sharing))

### :heart_decoration: Thanks to...

- Our contributors :thumbsup:
- haoala for the [original tools](https://dl.dropboxusercontent.com/u/14589881/index.html) (no longer maintained or hosted)
- [Start Bootstrap](https://github.com/davidtmiller) for the index.html theme

<div style="text-align: right"><a href="#book-table-of-contents">Top</a></div>

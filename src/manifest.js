const fs = require("node:fs");
const path = require("node:path");
const axios = require("axios");

const distributionDirectory = path.join(__dirname, "../dist");
if (!fs.existsSync(distributionDirectory)) {
  fs.mkdirSync(distributionDirectory);
}

const mainExtensionFileName = "main.js";
const popupMarkdownFileName = "toolbar/index.html";

const permissions = [
  "storage",
  "activeTab",
  "scripting",

  // "declarativeContent",
];

const iconSizes = ["16", "32", "48", "128"];
async function downloadImage(url, filepath) {
  const response = await axios({
    url,
    method: "GET",
    responseType: "stream",
  });
  return new Promise((resolve, reject) => {
    response.data
      .pipe(fs.createWriteStream(filepath, { flags: "a+" }))
      .on("error", reject)
      .once("close", () => resolve(filepath));
  });
}
const iconDirectory = path.join(__dirname, "../dist/icons");
const defaultIcon = {};
const icons = {};
const downloadIcons = [];
if (!fs.existsSync(iconDirectory)) {
  fs.mkdirSync(iconDirectory);
}
for (const v of iconSizes) {
  const defaultIconInWeb = `https://cdn3.iconfinder.com/data/icons/nasty-3/64/condom-broke_protection_sex_love-${v}.png`;
  const defaultIconName = `default_icon_${v}.png`;
  defaultIcon[v] = `icons/${defaultIconName}`;
  const defaultIconPath = path.join(__dirname, "../dist", defaultIcon[v]);
  downloadIcons.push(downloadImage(defaultIconInWeb, defaultIconPath));

  // const iconInWeb = `https://cdn2.iconfinder.com/data/icons/sexual-positions/239/sex-007-${v}.png`;
  const iconInWeb = `https://cdn2.iconfinder.com/data/icons/smashicons-grooming-retro-1/59/21_-Teddybear-_romance_lifestyle_love_sex-${v}.png`;
  const iconName = `icon_${v}.png`;
  icons[v] = `icons/${iconName}`;
  const iconPath = path.join(__dirname, "../dist", icons[v]);
  downloadIcons.push(downloadImage(iconInWeb, iconPath));
}
Promise.all(downloadIcons);

const settings = {
  manifest_version: 3,
  permissions,
  name: "Script source replacer",
  description: "Extension to replace src of scripts",
  version: "0.0.1",
  background: {
    service_worker: mainExtensionFileName,
  },
  action: {
    default_popup: popupMarkdownFileName,
    default_icon: defaultIcon,
  },
  icons,
};

const manifestPath = path.join(__dirname, "../dist/manifest.json");

fs.writeFile(
  manifestPath,
  JSON.stringify(settings),
  { encoding: "utf8" },
  (error) => {
    console.log(`> Manifest: ${error || "updated"}`);
  },
);

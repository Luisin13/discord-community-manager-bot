const fs = require("fs");
const { Client } = require("discord.js");

/**
 * @param {Client} Client
 */
module.exports = (Client) => {
  fs.readdirSync("./src/modules").forEach((dir) => {
    if (dir !== "readme.md") {
      const Modules = fs
        .readdirSync(`./src/modules/${dir}/`)
        .filter(
          (file) => file.endsWith(".js") && file.toString() == "index.js"
        );
      for (let file of Modules) {
        let pull = require(`../modules/${dir}/${file}`);
        if (pull.moduleInfo.name) {
          Client.Modules.set(pull.moduleInfo.name, pull);
        } else {
          continue;
        }
      }
    }
  });
};

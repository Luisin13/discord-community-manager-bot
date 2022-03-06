const { Client } = require("discord.js");
const fs = require("fs");
// const Collections = require("../index.js").Collections;

/**
 * @param {Client} Client 
 */
module.exports = (Client) => {
  fs.readdirSync("./src/events/").forEach((dir) => {
    fs.readdir(`./src/events/${dir}`, (err, files) => {
      var jsFiles = files.filter((f) => f.split(".").pop() === "js");

      jsFiles.forEach((file) => {
        require(`../events/${dir}/${file}`);
      });
    });
  });
};

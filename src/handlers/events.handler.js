//Packages imports
const { Client } = require("discord.js");
const { readdirSync, readdir, lstatSync } = require("fs");

/**
 * @param {Client} Client
 */
module.exports = (Client) => {
  //Reading dirs inside events folder
  readdirSync("./src/events/").forEach((dir) => {
    if (!lstatSync(`./src/events/${dir}`).isDirectory()) return;
    //Reading events
    readdir(`./src/events/${dir}`, (err, files) => {
      var jsFiles = files.filter((f) => f.split(".").pop() === "js");

      jsFiles.forEach((file) => {
        //Importing events
        require(`../events/${dir}/${file}`);
      });
    });
  });
};

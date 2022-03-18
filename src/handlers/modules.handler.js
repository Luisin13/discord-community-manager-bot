//Packages imports
const { readdirSync, lstatSync } = require("fs");
const { Client } = require("discord.js");

/**
 * @param {Client} Client
 */
module.exports = (Client) => {
  //Reading dirs inside modules folder
  readdirSync("./src/modules").forEach((dir) => {
    if (!lstatSync(`./src/modules/${dir}`).isDirectory()) return;
    //Reading Modules
    const Modules = readdirSync(`./src/modules/${dir}/`).filter(
      (file) => file.endsWith(".js") && file.toString() == "index.js"
    );
    for (let file of Modules) {
      //Importing modules
      let pull = require(`../modules/${dir}/${file}`);
      if (pull.moduleInfo.name) {
        //Setting module in Modules Collection
        Client.Modules.set(pull.moduleInfo.name, pull);
      } else {
        continue;
      }
    }
  });
};

//Packages imports
const { readdirSync, lstatSync } = require("fs");
const { Client } = require("discord.js");

/**
 * @param {Client} Client
 */
module.exports = (Client) => {
  //Reading dirs inside slash commands folder
  readdirSync("./src/commands/slash/").forEach((dir) => {
    if (!lstatSync(`./src/commands/slash/${dir}`).isDirectory()) return;
    //Reading slash commands
    const SlashCommands = readdirSync(`./src/commands/slash/${dir}/`).filter(
      (file) => file.endsWith(".js")
    );
    for (let file of SlashCommands) {
      let pull = require(`../commands/slash/${dir}/${file}`);
      if (pull.help.name) {
        //Setting slash command in Slash Command Collection
        Client.SlashCollection.set(pull.help.name, pull);
      } else {
        continue;
      }
    }
  });
};

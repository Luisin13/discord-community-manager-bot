const fs = require("fs");
const { Client } = require("discord.js");

/**
 * @param {Client} Client
 */
module.exports = (Client) => {
  fs.readdirSync("./src/commands/slash/").forEach((dir) => {
    const SlashCommands = fs
      .readdirSync(`./src/commands/slash/${dir}/`)
      .filter((file) => file.endsWith(".js"));
    for (let file of SlashCommands) {
      let pull = require(`../commands/slash/${dir}/${file}`);
      if (pull.help.name) {
        Client.SlashCollection.set(pull.help.name, pull);
      } else {
        continue;
      }
    }
  });
};

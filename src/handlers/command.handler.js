const fs = require("fs");
const { Client } = require("discord.js");

/**
 * @param {Client} Client
 */
module.exports = (Client) => {
  fs.readdirSync("./src/commands/prefix/").forEach((dir) => {
    const SlashCommands = fs
      .readdirSync(`./src/commands/prefix/${dir}/`)
      .filter((file) => file.endsWith(".js"));
    for (let file of SlashCommands) {
      let pull = require(`../commands/prefix/${dir}/${file}`);
      if (pull.help.name) {
        Client.CommandCollection.set(pull.help.name, pull);
        pull.help.aliases.forEach(alias => {
          Client.AliasesCollection.set(alias, pull);
      })
      } else {
        continue;
      }
    }
  });
};

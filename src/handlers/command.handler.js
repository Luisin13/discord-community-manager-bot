//Packages imports
const { readdirSync, lstatSync } = require("fs");
const { Client } = require("discord.js");

/**
 * @param {Client} Client
 */
module.exports = (Client) => {
  //Reading dirs inside prefix commands folder
  readdirSync("./src/commands/prefix/").forEach((dir) => {
    if (!lstatSync(`./src/commands/prefix/${dir}`).isDirectory()) return;
    //Reading commands
    const CommandFile = readdirSync(`./src/commands/prefix/${dir}/`).filter(
      (file) => file.endsWith(".js")
    );
    for (let file of CommandFile) {
      let pull = require(`../commands/prefix/${dir}/${file}`);
      if (pull.help.name) {
        //Setting command in Command Collection
        Client.CommandCollection.set(pull.help.name, pull);
        pull.help.aliases.forEach((alias) => {
          Client.AliasesCollection.set(alias, pull);
        });
      } else {
        continue;
      }
    }
  });
};

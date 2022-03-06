const { Intents } = require("discord.js");
const { Collection } = require("@discordjs/collection");
const Discord = require("discord.js");
const config = require("../config.js");
const { readdirSync } = require("fs");
const fs = require("fs");

const Client = new Discord.Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
});

Client.SlashCollection = new Collection();
Client.CommandCollection = new Collection();
Client.AliasesCollection = new Collection();
Client.Modules = new Collection();

readdirSync("./src/handlers/").forEach((dir) => {
  var jsFiles = readdirSync("./src/handlers/").filter(
    (f) => f.split(".").pop() === "js"
  );

  jsFiles.forEach((file) => {
    require(`./handlers/${file}`)(Client);
  });
});

module.exports.Client = Client;

Client.login(config.TOKEN);

//Packages imports
const { Intents, Collection } = require("discord.js");
const Discord = require("discord.js");
const config = require("../config.js");
const { readdirSync } = require("fs");

//Configuring Client
const Client = new Discord.Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
});

Client.SlashCollection = new Collection();
Client.CommandCollection = new Collection();
Client.AliasesCollection = new Collection();
Client.Modules = new Collection();

//Executing handlers
readdirSync("./src/handlers/").forEach((dir) => {
  var jsFiles = readdirSync("./src/handlers/").filter(
    (f) => f.split(".").pop() === "js"
  );

  jsFiles.forEach((file) => {
    require(`./handlers/${file}`)(Client);
  });
});

//Exporting the Client
module.exports.Client = Client;

//Client Login
Client.login(config.TOKEN);

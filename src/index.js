//Packages imports
require("dotenv").config();
const { Intents, Collection } = require("discord.js");
const Discord = require("discord.js");
const config =
  process.env.PRODUCTION.toLowerCase() === "false"
    ? require(`${process.cwd()}/config.js`)
    : require(`${process.cwd()}/config.dev.js`);
const { readdirSync, statSync } = require("fs");
const MusicController = require("./controllers/music");

//Configuring Client
const Client = new Discord.Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
});

Client.SlashCollection = new Collection();
Client.CommandCollection = new Collection();
Client.AliasesCollection = new Collection();
Client.Modules = new Collection();
Client.Music = new MusicController(Client);

//Executing handlers
readdirSync("./src/handlers/").forEach((file) => {
  if(statSync(`./src/handlers/${file}`).isDirectory()) return;
  
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

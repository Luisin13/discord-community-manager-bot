//Imports
const Discord = require("discord.js");
const config =
  process.env.PRODUCTION.toLowerCase() === "false"
    ? require(`${process.cwd()}/config.js`)
    : require(`${process.cwd()}/config.dev.js`);
const translations = require(`${process.cwd()}/locales/${
  config.LANGUAGE
}/commands.js`);

/**
 *
 * @param {Discord.Client} Client
 * @param {Discord.Message} message
 * @param {String[]} args
 * @param {String} prefix
 */
module.exports.run = async (Client, message, args, prefix) => {
  try {
    let con = Client.Music.connect(message.channel, message.guild);
    message.reply(translations.connect.success());
    console.log(con)
  } catch (error) {
    console.log(error);
    message.reply(translations.connect.error());
  }
};

module.exports.help = {
  name: "connect",
  description: translations.ping.description(),
  aliases: [],
  category: translations.ping.category(),
};

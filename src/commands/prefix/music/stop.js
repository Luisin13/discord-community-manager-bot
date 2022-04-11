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
  if (!Client.Music.connection) return message.reply(translations.stop.noConnection());
  if (!message.member.voice.channel)
    return message.reply(translations.stop.noVoiceChannel());
  try {
    Client.Music.stop();
    message.reply(translations.stop.success());
  } catch (error) {
    console.log(error);
    message.reply(translations.stop.error());
  }
};

module.exports.help = {
  name: "stop",
  description: translations.stop.description(),
  aliases: [],
  category: translations.stop.category(),
};

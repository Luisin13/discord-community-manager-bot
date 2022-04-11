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
  if (!Client.Music.connection) return message.reply(translations.disconnect.noConnection());
  if(!message.member.voice.channel) return message.reply(translations.disconnect.noVoiceChannel());
  try {
    Client.Music.disconnect();
    message.reply(translations.disconnect.success());
  } catch (error) {
    console.log(error);
    message.reply(translations.disconnect.error());
  }
};

module.exports.help = {
  name: "disconnect",
  description: translations.disconnect.description(),
  aliases: [],
  category: translations.disconnect.category(),
};

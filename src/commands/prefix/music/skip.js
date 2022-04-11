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
  if (!Client.Music.connection) return message.reply(translations.skip.noConnection());
  if(!message.member.voice.channel) return message.reply(translations.skip.noVoiceChannel());
  if(!Client.Music.canSkip()) return message.reply(translations.skip.cantSkip());
  try {
    Client.Music.skip();
    message.reply(translations.skip.success());
  } catch (error) {
    console.log(error);
    message.reply(translations.skip.error());
  }
};

module.exports.help = {
  name: "skip",
  description: translations.skip.description(),
  aliases: [],
  category: translations.skip.category(),
};

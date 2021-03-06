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
  if(!message.member.voice.channel) return message.reply(translations.connect.noVoiceChannel());
  try {
    Client.Music.connect(message.member.voice.channel, message.guild);
    message.reply(translations.connect.success());
  } catch (error) {
    console.log(error);
    message.reply(translations.connect.error());
  }
};

module.exports.help = {
  name: "connect",
  description: translations.connect.description(),
  aliases: [],
  category: translations.connect.category(),
};

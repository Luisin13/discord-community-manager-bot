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
  if (!Client.Music.connection) return message.reply(translations.loop.noConnection());
  if(!message.member.voice.channel) return message.reply(translations.loop.noVoiceChannel());
  try {
    const mode = Client.Music.loop();
    message.reply(translations.loop.success(mode));
  } catch (error) {
    console.log(error);
    message.reply(translations.loop.error());
  }
};

module.exports.help = {
  name: "loop",
  description: translations.loop.description(),
  aliases: [],
  category: translations.loop.category(),
};

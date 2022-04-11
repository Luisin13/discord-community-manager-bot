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
  if (!args[0]) return message.reply(translations.play.noSong());
  if (!message.member.voice.channel)
    return message.reply(translations.play.noVoiceChannel());
  try {
    if (args[0].includes("youtube.com/playlist?list=")) {
      await Client.Music.loadPlaylist(
        message.member.voice.channel,
        message.guild,
        args[0]
      );
      return message.reply(translations.play.success());
    }
    if (Client.Music.playing === true) {
      const error = Client.Music.addToQueue(args[0]);
      if (error === "Invalid URL")
        return message.reply(translations.play.error());
      else return message.reply(translations.play.addToQueue());
    }
    const error = Client.Music.play(
      message.member.voice.channel,
      message.guild,
      args[0]
    );
    if (error === "Invalid URL")
      return message.reply(translations.play.error());
    message.reply(translations.play.success());
  } catch (error) {
    console.log(error);
    message.reply(translations.play.error());
  }
};

module.exports.help = {
  name: "play",
  description: translations.play.description(),
  aliases: [],
  category: translations.play.category(),
};

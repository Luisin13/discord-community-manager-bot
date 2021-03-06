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
  //Executing Command
  message.reply(`${translations.ping.calculating()}`).then((resultMessage) => {
    const y = resultMessage.createdTimestamp - message.createdTimestamp;
    const x = 2;
    const yx = y / x;
    const ping = Math.floor(yx);
    const APIping = Math.round(Client.ws.ping);

    const embed = new Discord.MessageEmbed()
      .setTitle(`🏓** Pong**`)
      .setDescription(translations.ping.pingEmbed(ping, APIping))
      .setColor("BLUE");

    resultMessage.edit({ content: "​", embeds: [embed] });
  });
};

module.exports.help = {
  name: "ping",
  description: translations.ping.description(),
  aliases: ["p"],
  category: translations.ping.category(),
};

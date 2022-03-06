const Discord = require("discord.js");
const config = require(`${process.cwd()}/config.js`);
const translations = require(`${process.cwd()}/locales/${
  config.LANGUAGE
}/commands.js`);

/**
 *
 * @param {Discord.Client} Client
 * @param {Discord.CommandInteraction} interaction
 */
module.exports.run = async (interaction, Client) => {
  interaction
    .deferReply({ fetchReply: true }) //.reply({ content: `Calculando...`, fetchReply: true })
    .then((resultInteraction) => {
      const y =
        resultInteraction.createdTimestamp - interaction.createdTimestamp;
      const x = 2;
      const yx = y / x;
      const ping = Math.floor(yx);
      const APIping = Math.round(Client.ws.ping);

      const embed = new Discord.MessageEmbed()
        .setTitle(`🏓** Pong**`)
        .setDescription(translations.ping.pingEmbed(ping, APIping))
        .setColor("BLUE");
      interaction.editReply({ embeds: [embed] });
    });
};

module.exports.help = {
  name: "ping",
  description: translations.ping.description(),
  type: "TEXT_INPUT",
  category: "utilidade",
  defer: false
};

module.exports.cmd = {
  name: "ping",
  description: translations.ping.description(),
  type: "TEXT_INPUT",
};

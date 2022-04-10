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
 * @param {Discord.CommandInteraction} interaction
 */
module.exports.run = async (interaction, Client) => {
  //Get options
  const user = interaction.options.getMember(translations.unmute.user(), true);
  const reason =
    interaction.options.getString(translations.unmute.reason()) ||
    translations.unmute.noReason();

  //Conditions to not execute the unmute
  if (interaction.user.id == user.id)
    return interaction.reply(translations.unmute.unmuteYourself());
  if (user.id == interaction.guild.ownerId)
    return interaction.reply(translations.unmute.unmuteOwner());
  if (user.id == Client.user.id)
    return interaction.reply(translations.unmute.unmuteBot());
  if (
    interaction.member.roles.highest.position <=
    (await interaction.guild.members.fetch(user.id)).roles.highest.position
  )
    return interaction.reply(translations.unmute.lowerRole());
  if (
    interaction.guild.me.roles.highest.position <=
    (await interaction.guild.members.fetch(user.id)).roles.highest.position
  )
    return interaction.reply(translations.unmute.lowerBotRole());

  //Unmute the user
  user
    .timeout(null, reason)
    .then(() => {
      interaction.reply(translations.unmute.success(user));
    })
    .catch(() => {
      interaction.reply(translations.unmute.error());
    });
};

module.exports.help = {
  name: "unmute",
  description: translations.unmute.description(),
  type: "TEXT_INPUT",
  category: translations.unmute.category(),
  defer: false,
};

module.exports.cmd = {
  name: "unmute",
  description: translations.unmute.description(),
  type: "TEXT_INPUT",
  options: [
    {
      name: translations.unmute.user(),
      description: translations.unmute.userDescription(),
      type: 6,
      required: true,
    },
    {
      name: translations.unmute.reason(),
      description: translations.unmute.reasonDescription(),
      type: 3,
      required: false,
    },
  ],
};

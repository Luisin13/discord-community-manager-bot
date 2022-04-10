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
  const member = interaction.options.getMember(translations.kick.user(), true);
  const reason =
    interaction.options.getString(translations.kick.reason()) ||
    translations.kick.noReason();

  //Conditions to not execute the kick
  if (interaction.user.id == member.id)
    return interaction.reply(translations.kick.kickYourself());
  if (member.id == interaction.guild.ownerId)
    return interaction.reply(translations.kick.kickOwner());
  if (member.id == Client.user.id)
    return interaction.reply(translations.kick.kickBot());
  if (
    interaction.member.roles.highest.position <=
    (await interaction.guild.members.fetch(member.id)).roles.highest.position
  )
    return interaction.reply(translations.kick.lowerRole());
  if (
    interaction.guild.me.roles.highest.position <=
    (await interaction.guild.members.fetch(member.id)).roles.highest.position
  )
    return interaction.reply(translations.kick.lowerBotRole());

  //Kicks the member
  member
    .kick(`${reason}`)
    .then(() => {
      interaction.reply(translations.kick.success(member.user));
    })
    .catch(() => {
      interaction.reply(translations.kick.error());
    });
};

module.exports.help = {
  name: "kick",
  description: translations.kick.description(),
  type: "TEXT_INPUT",
  category: translations.kick.category(),
  defer: false,
};

module.exports.cmd = {
  name: "kick",
  description: translations.kick.description(),
  type: "TEXT_INPUT",
  default_permission: false,
  options: [
    {
      name: translations.kick.user(),
      description: translations.kick.userDescription(),
      type: 6,
      required: true,
    },
    {
      name: translations.kick.reason(),
      description: translations.kick.reasonDescription(),
      type: 3,
      required: false,
    },
  ],
};

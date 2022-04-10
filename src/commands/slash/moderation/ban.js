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
  const user = interaction.options.getUser(translations.ban.user(), true);
  const reason =
    interaction.options.getString(translations.ban.reason()) ||
    translations.ban.noReason();
  const deleteMessage =
    Number(interaction.options.getString(translations.ban.messages())) || 0;

  //Conditions to not execute the ban
  if (interaction.user.id == user.id)
    return interaction.reply(translations.ban.banYourself());
  if (user.id == interaction.guild.ownerId)
    return interaction.reply(translations.ban.banOwner());
  if (user.id == Client.user.id)
    return interaction.reply(translations.ban.banBot());
  if (
    interaction.member.roles.highest.position <=
    (await interaction.guild.members.fetch(user.id)).roles.highest.position
  )
    return interaction.reply(translations.ban.lowerRole());
  if (
    interaction.guild.me.roles.highest.position <=
    (await interaction.guild.members.fetch(user.id)).roles.highest.position
  )
    return interaction.reply(translations.ban.lowerBotRole());

  //Ban the user
  interaction.guild.bans
    .create(`${user.id}`, {
      reason: `${reason}`,
      days: deleteMessage,
    })
    .then(() => {
      interaction.reply(translations.ban.success(user));
    })
    .catch(() => {
      interaction.reply(translations.ban.error());
    });
};

module.exports.help = {
  name: "ban",
  description: translations.ban.description(),
  type: "TEXT_INPUT",
  category: translations.ban.category(),
  defer: false,
};

module.exports.cmd = {
  name: "ban",
  description: translations.ban.description(),
  type: "TEXT_INPUT",
  default_permission: false,
  options: [
    {
      name: translations.ban.user(),
      description: translations.ban.userDescription(),
      type: 6,
      required: true,
    },
    {
      name: translations.ban.reason(),
      description: translations.ban.reasonDescription(),
      type: 3,
      required: false,
    },
    {
      name: translations.ban.messages(),
      description: translations.ban.messagesDescription(),
      type: 3,
      required: false,
      choices: [
        {
          name: "0",
          value: "0",
        },
        {
          name: "1",
          value: "1",
        },
        {
          name: "2",
          value: "2",
        },
        {
          name: "3",
          value: "3",
        },
        {
          name: "4",
          value: "4",
        },
        {
          name: "5",
          value: "5",
        },
        {
          name: "6",
          value: "6",
        },
        {
          name: "7",
          value: "7",
        },
      ],
    },
  ],
};

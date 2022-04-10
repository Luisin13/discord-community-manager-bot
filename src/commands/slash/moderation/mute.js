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
  const user = interaction.options.getMember(translations.mute.user(), true);
  let timeToMute = Number(
    interaction.options.getInteger(translations.mute.time(), true)
  );
  const timeFormat = interaction.options.getString(
    translations.mute.timeFormat(),
    true
  );
  const reason =
    interaction.options.getString(translations.mute.reason()) ||
    translations.mute.noReason();

  if (timeFormat === "minutes") {
    if (timeToMute > 10080) {
      return interaction.reply(translations.mute.tooLong());
    }
    timeToMute = timeToMute * 60;
  } else if (timeFormat === "hours") {
    if (timeToMute > 168) {
      return interaction.reply(translations.mute.tooLong());
    }
    timeToMute = timeToMute * 60 * 60;
  } else if (timeFormat === "days") {
    if (timeToMute > 7) {
      return interaction.reply(translations.mute.tooLong());
    }
    timeToMute = timeToMute * 24 * 60 * 60;
  }

  //Conditions to not execute the mute
  if (interaction.user.id == user.id)
    return interaction.reply(translations.mute.muteYourself());
  if (user.id == interaction.guild.ownerId)
    return interaction.reply(translations.mute.muteOwner());
  if (user.id == Client.user.id)
    return interaction.reply(translations.mute.muteBot());
  if (
    interaction.member.roles.highest.position <=
    (await interaction.guild.members.fetch(user.id)).roles.highest.position
  )
    return interaction.reply(translations.mute.lowerRole());
  if (
    interaction.guild.me.roles.highest.position <=
    (await interaction.guild.members.fetch(user.id)).roles.highest.position
  )
    return interaction.reply(translations.mute.lowerBotRole());

  //Mute the user
  user
    .timeout(timeToMute * 1000, reason)
    .then(() => {
      interaction.reply(translations.mute.success(user));
    })
    .catch(() => {
      interaction.reply(translations.mute.error());
    });
};

module.exports.help = {
  name: "mute",
  description: translations.mute.description(),
  type: "TEXT_INPUT",
  category: translations.mute.category(),
  defer: false,
};

module.exports.cmd = {
  name: "mute",
  description: translations.mute.description(),
  type: "TEXT_INPUT",
  options: [
    {
      name: translations.mute.user(),
      description: translations.mute.userDescription(),
      type: 6,
      required: true,
    },
    {
      name: translations.mute.time(),
      description: translations.mute.timeDescription(),
      type: 4,
      required: true,
    },
    {
      name: translations.mute.timeFormat(),
      description: translations.mute.timeFormatDescription(),
      type: 3,
      required: true,
      choices: [
        {
          name: translations.mute.timeFormatChoices().minutes,
          value: "minutes",
        },
        {
          name: translations.mute.timeFormatChoices().hours,
          value: "hours",
        },
        {
          name: translations.mute.timeFormatChoices().days,
          value: "days",
        },
      ],
    },
    {
      name: translations.mute.reason(),
      description: translations.mute.reasonDescription(),
      type: 3,
      required: false,
    },
  ],
};

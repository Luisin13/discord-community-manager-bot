const asciiTable = require("ascii-table");
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
  let hasRole = false;

  for (let i = 0; i < message.member._roles.length; i++) {
    const role = message.member._roles[i];
    if (hasRole === true) break;
    config.MODROLES.toString().includes(role)
      ? (hasRole = true)
      : (hasRole = false);
  }

  if (hasRole === false) return message.reply(translations.ban.noPermission());

  let user = args[0];
  if (!user) return message.reply(translations.ban.noUser());
  const reason = args.slice(1).join(" ") || translations.ban.noReason();

  if (user.startsWith("<@") && user.endsWith(">")) {
    user = user.slice(2, -1);
  }
  if (user.startsWith("<@!") && user.endsWith(">")) {
    user = user.slice(3, -1);
  }

  Client.users
    .fetch(user, { force: true })
    .then(async (u) => {
      user = u;
      //Conditions to not execute the ban
      if (message.author.id == user.id)
        return message.reply(translations.ban.banYourself());
      if (user.id == message.guild.ownerId)
        return message.reply(translations.ban.banOwner());
      if (user.id == Client.user.id)
        return message.reply(translations.ban.banBot());
      if (
        message.member.roles.highest.position <=
        (await message.guild.members.fetch(user.id)).roles.highest.position
      )
        return message.reply(translations.ban.lowerRole());
      if (
        message.guild.me.roles.highest.position <=
        (await message.guild.members.fetch(user.id)).roles.highest.position
      )
        return message.reply(translations.ban.lowerBotRole());

      //Ban the user
      message.guild.bans
        .create(`${user.id}`, {
          reason: `${reason}`,
          days: 0,
        })
        .then(() => {
          message.reply(translations.ban.success(user));
        })
        .catch(() => {
          message.reply(translations.ban.error());
        });
    })
    .catch((err) => {
      return message.reply(translations.ban.error());
    });
};

module.exports.help = {
  name: "ban",
  description: translations.ban.description(),
  aliases: [],
  category: translations.ban.category(),
};

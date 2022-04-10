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

  if (hasRole === false) return message.reply(translations.kick.noPermission());

  let member = args[0];
  if (!member) return message.reply(translations.kick.noUser());
  const reason = args.slice(1).join(" ") || translations.kick.noReason();

  if (member.startsWith("<@") && member.endsWith(">")) {
    member = member.slice(2, -1);
  }
  if (member.startsWith("<@!") && member.endsWith(">")) {
    member = member.slice(3, -1);
  }

  message.guild.members
    .fetch(member, { force: true })
    .then(async (m) => {
      member = m;
      //Conditions to not execute the kick
      if (message.author.id == member.id)
        return message.reply(translations.kick.kickYourself());
      if (member.id == message.guild.ownerId)
        return message.reply(translations.kick.kickOwner());
      if (member.id == Client.user.id)
        return message.reply(translations.kick.kickBot());
      if (
        message.member.roles.highest.position <=
        (await message.guild.members.fetch(member.id)).roles.highest.position
      )
        return message.reply(translations.kick.lowerRole());
      if (
        message.guild.me.roles.highest.position <=
        (await message.guild.members.fetch(member.id)).roles.highest.position
      )
        return message.reply(translations.kick.lowerBotRole());

      //kick the member
      member
        .kick(`${reason}`)
        .then(() => {
          message.reply(translations.kick.success(member));
        })
        .catch(() => {
          message.reply(translations.kick.error());
        });
    })
    .catch((err) => {
      return message.reply(translations.kick.error());
    });
};

module.exports.help = {
  name: "kick",
  description: translations.kick.description(),
  aliases: [],
  category: translations.kick.category(),
};

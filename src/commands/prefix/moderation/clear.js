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

  if (hasRole === false)
    return message.reply(translations.clear.noPermission());

  const amount = Number(args[0]);
  if (!amount) return message.reply(translations.clear.noAmount());
  if (amount > 100) return message.reply(translations.clear.tooMuch());

  message.deletable ? message.delete() : null;
  message.channel
    .bulkDelete(amount)
    .then(() => {
      message.channel.send(translations.clear.success(amount));
    })
    .catch((err) => {
      message.reply(translations.clear.error());
    });
};

module.exports.help = {
  name: "clear",
  description: translations.clear.description(),
  aliases: [],
  category: translations.clear.category(),
};

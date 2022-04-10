//Imports
const Discord = require("discord.js");
const config =
  process.env.PRODUCTION.toLowerCase() === "false"
    ? require(`${process.cwd()}/config.js`)
    : require(`${process.cwd()}/config.dev.js`);
const translations = require(`${process.cwd()}/locales/${
  config.LANGUAGE
}/commands.js`);
const sleep = require(`${process.cwd()}/src/util/sleep.js`);

/**
 *
 * @param {Discord.Client} Client
 * @param {Discord.Message} message
 * @param {String[]} args
 * @param {String} prefix
 */
module.exports.run = async (Client, message, args, prefix) => {
  let user;

  if (args[0] && args[0].startsWith("<@!") && args[0].endsWith(">")) {
    user = args[0].replace(/[<@!>]/g, "");
  } else if (args[0] && args[0].startsWith("<@") && args[0].endsWith(">")) {
    user = args[0].replace(/[<@>]/g, "");
  } else if (
    args[0] &&
    args[0].length >= 17 &&
    args[0].length <= 18 &&
    args[0].match(/^[0-9]+$/)
  ) {
    user = args[0];
  } else {
    user = message.author.id;
  }

  try {
    const avatar = await Client.users.fetch(`${user || message.author.id}`, {
        force: true,
      }),
      embed = new Discord.MessageEmbed()
        .setColor(config.EMBED_COLOR || "#0099ff")
        .setTitle(`🖼 ${avatar.username}`)
        .setImage(avatar.displayAvatarURL({ dynamic: true, size: 2048 })),
      button = new Discord.MessageActionRow().addComponents(
        new Discord.MessageButton()
          .setLabel(`${translations.avatar.openBrowser()}`)
          .setStyle("LINK")
          .setURL(`${avatar.displayAvatarURL({ dynamic: true, size: 2048 })}`)
      );

    return message.reply({
      embeds: [embed],
      components: [button],
    });
  } catch (error) {
    return message.reply(translations.avatar.error());
  }
};

module.exports.help = {
  name: "avatar",
  description: translations.avatar.description(),
  aliases: [],
  category: translations.avatar.category(),
};

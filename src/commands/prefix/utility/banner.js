//Imports
const Canvas = require("canvas");
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
    const banner = await Client.users.fetch(`${user || message.author.id}`, {
        force: true,
      }),
      canvas = Canvas.createCanvas(700, 250),
      ctx = canvas.getContext("2d");

    ctx.fillStyle = `${banner.hexAccentColor}`;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const embed = new Discord.MessageEmbed()
        .setColor(config.EMBED_COLOR || "#0099ff")
        .setTitle(`🖼 ${banner.username}`),
      button = new Discord.MessageActionRow().addComponents(
        new Discord.MessageButton()
          .setLabel(`${translations.banner.openBrowser()}`)
          .setStyle("LINK")
          .setURL(`${banner.bannerURL({ dynamic: true, size: 2048 })}`)
      );
    banner.banner
      ? embed.setImage(banner.bannerURL({ dynamic: true, size: 2048 }))
      : banner.accentColor
      ? (embed.setImage("attachment://banner.png"),
        embed.setDescription(translations.banner.color(banner.hexAccentColor)))
      : null;

    const msg = {
      embeds: [embed],
      files: [new Discord.MessageAttachment(canvas.toBuffer(), "banner.png")],
    };

    banner.banner ? (msg.files = []) : null;
    banner.banner ? (msg.components = [button]) : null;
    return message.reply(msg);
  } catch (error) {
    return message.reply(translations.banner.error());
  }
};

module.exports.help = {
  name: "banner",
  description: translations.banner.description(),
  aliases: [],
  category: translations.banner.category(),
};

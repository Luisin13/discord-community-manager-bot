const Discord = require("discord.js");
const Canvas = require("canvas");
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
  switch (interaction.options.getSubcommand()) {
    case "avatar": {
      const { id: user } =
        interaction.options.getUser(translations.banner.user()) ||
        interaction.user;
      try {
        const avatar = await Client.users.fetch(`${user}`, {
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
              .setURL(
                `${avatar.displayAvatarURL({ dynamic: true, size: 2048 })}`
              )
          );

        interaction.reply({
          embeds: [embed],
          components: [button],
        });
      } catch (error) {
        interaction.reply({
          content: translations.avatar.error(),
          ephemeral: true,
        });
      }
      break;
    }
    case "banner": {
      const { id: user } =
        interaction.options.getUser(translations.banner.user()) ||
        interaction.user;
      try {
        const banner = await Client.users.fetch(`${user}`, {
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
            embed.setDescription(
              translations.banner.color(banner.hexAccentColor)
            ))
          : null;

        const msg = {
          embeds: [embed],
          files: [
            new Discord.MessageAttachment(canvas.toBuffer(), "banner.png"),
          ],
        };

        banner.banner ? (msg.files = []) : null;
        banner.banner ? (msg.components = [button]) : null;
        interaction.reply(msg);
      } catch (error) {
        interaction.reply({
          content: translations.banner.error(),
          ephemeral: true,
        });
      }
      break;
    }
  }
};

module.exports.help = {
  name: "user",
  description: translations.avatar.description(),
  type: "TEXT_INPUT",
  category: translations.avatar.category(),
  defer: false,
};

module.exports.cmd = {
  name: "user",
  description: translations.avatar.description(),
  type: "TEXT_INPUT",
  options: [
    {
      name: "avatar",
      description: translations.avatar.description(),
      type: 1,
      options: [
        {
          name: translations.avatar.user(),
          description: translations.avatar.userDescription(),
          type: 6,
          required: false,
        },
      ],
    },
    {
      name: "banner",
      description: translations.banner.description(),
      type: 1,
      options: [
        {
          name: translations.banner.user(),
          description: translations.banner.userDescription(),
          type: 6,
          required: false,
        },
      ],
    },
  ],
};

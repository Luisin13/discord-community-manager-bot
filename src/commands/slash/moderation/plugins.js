const Discord = require("discord.js");
const asciiTable = require("ascii-table");
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
  const pluginsInfo = [],
    plugins = require(`${process.cwd()}/plugins.js`);
  for (const cat of Object.keys(plugins)) {
    for (const plugin of plugins[cat]) {
      const pluginInfo = require(`${process.cwd()}/src/plugins/${plugin}`)
        .pluginInfo;
      pluginsInfo.push(pluginInfo);
    }
  }

  if (pluginsInfo.length > 0) {
    const table = new asciiTable("Plugins")
      .setHeading("Plugin", `${translations.plugins.author()}`, "GitHub")
      .setBorder("┃", "―", "+", "+");

    pluginsInfo.forEach((plugin) => {
      table.addRow(
        plugin.name,
        plugin.author,
        plugin.githubRepo.split("/").pop()
      );
    });
    interaction.reply(`\`\`\`prolog\n${table.toString()}\`\`\``);
  } else {
    interaction.reply(translations.plugins.noPlugins());
  }
};

module.exports.help = {
  name: "plugins",
  description: translations.plugins.description(),
  type: "TEXT_INPUT",
  category: translations.ban.category(),
  defer: false,
};

module.exports.cmd = {
  name: "plugins",
  description: translations.plugins.description(),
  type: "TEXT_INPUT",
  default_permission: false,
};

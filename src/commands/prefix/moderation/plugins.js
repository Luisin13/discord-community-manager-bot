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
    return message.reply(translations.plugins.noPermission());

  const pluginsInfo = [],
    plugins = require(`${process.cwd()}/plugins.js`);
  for (const cat of Object.keys(plugins)) {
    for (const plugin of plugins[cat]) {
      const pluginInfo =
        require(`${process.cwd()}/src/plugins/${plugin}`).pluginInfo;
      pluginsInfo.push(pluginInfo);
    }
  }

  if (pluginsInfo.length > 0) {
    const table = new asciiTable("Plugins")
      .setHeading("Plugin", `${translations.plugins.author()}`, "GitHub")
      .setBorder("┃", "―", "+", "+");

    pluginsInfo.forEach((plugin) => {
      table.addRow(plugin.name, plugin.author, plugin.githubRepo.split("/").pop());
    });
    message.reply(`\`\`\`prolog\n${table.toString()}\`\`\``);
  } else {
    message.reply(translations.plugins.noPlugins());
  }
};

module.exports.help = {
  name: "plugins",
  description: translations.plugins.description(),
  aliases: [],
  category: translations.plugins.category(),
};

const asciiTable = require("ascii-table");
const Discord = require("discord.js");
const sleep = require(`${process.cwd()}/src/util/sleep`);
const config = require(`${process.cwd()}/config.js`);
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
  const pluginsInfo = [];
  const plugins = require(`${process.cwd()}/plugins.js`);
  for (const cat of Object.keys(plugins)) {
    for (const plugin of plugins[cat]) {
      const pluginInfo =
        require(`${process.cwd()}/src/plugins/${plugin}`).pluginInfo;
      pluginsInfo.push(pluginInfo);
    }
  }

  await sleep(200);
  const table = new asciiTable("Plugins")
    .setHeading("Plugin", `${translations.plugins.author()}`, "GitHub")
    .setBorder("┃", "―", "+", "+")
    
  pluginsInfo.forEach((plugin) => {
    table.addRow(plugin.name, plugin.author, plugin.githubRepo);
  });
  message.reply(`\`\`\`prolog\n${table.toString()}\`\`\``);
};

module.exports.help = {
  name: "plugins",
  description: "Olha os plugins instalados no bot",
  aliases: [],
  category: "utilidade",
};

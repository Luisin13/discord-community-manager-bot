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
    return message.reply(translations.modules.noPermission());

  const modulesInfo = [];
  let clientModules = Client.Modules,
    modules = [...Array.from(clientModules)][0].filter(
      (module) => typeof module === "object"
    );

  for (const module of modules) {
    const moduleInfo = module.moduleInfo;
    delete module.run;
    modulesInfo.push(moduleInfo);
  }

  if (modulesInfo.length > 0) {
    const table = new asciiTable("Modules")
      .setHeading("Module", `${translations.modules.author()}`, "GitHub")
      .setBorder("┃", "―", "+", "+");

    modulesInfo.forEach((module) => {
      table.addRow(module.name, module.author, module.github.split("/").pop());
    });
    message.reply(`\`\`\`prolog\n${table.toString()}\`\`\``);
  } else {
    message.reply(translations.modules.noModules());
  }
};

module.exports.help = {
  name: "modules",
  description: translations.modules.description(),
  aliases: [],
  category: translations.modules.category(),
};

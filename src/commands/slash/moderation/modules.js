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
    interaction.reply(`\`\`\`prolog\n${table.toString()}\`\`\``);
  } else {
    interaction.reply(translations.modules.noModules());
  }
};

module.exports.help = {
  name: "modules",
  description: translations.modules.description(),
  type: "TEXT_INPUT",
  category: translations.ban.category(),
  defer: false,
};

module.exports.cmd = {
  name: "modules",
  description: translations.modules.description(),
  type: "TEXT_INPUT",
  default_permission: false,
};

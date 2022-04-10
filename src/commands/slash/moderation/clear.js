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
 * @param {Discord.CommandInteraction} interaction
 */
module.exports.run = async (interaction, Client) => {
  const amount = interaction.options.getInteger(
    translations.clear.amount(),
    true
  );

  if (amount > 100) return interaction.reply(translations.clear.tooMany());

  interaction.channel
    .bulkDelete(amount)
    .then((result) => {
      return interaction.reply(translations.clear.success(amount));
    })
    .catch((err) => {
      return interaction.reply(translations.clear.error());
    });
};

module.exports.help = {
  name: "clear",
  description: translations.clear.description(),
  type: "TEXT_INPUT",
  category: translations.clear.category(),
  defer: false,
};

module.exports.cmd = {
  name: "clear",
  description: translations.clear.description(),
  type: "TEXT_INPUT",
  options: [
    {
      name: translations.clear.amount(),
      description: translations.clear.amountDescription(),
      type: 4,
      required: true,
    },
  ],
};

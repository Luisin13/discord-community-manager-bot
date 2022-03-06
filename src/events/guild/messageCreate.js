const { existsSync } = require("fs");
const config = require("../../../config.js");
const plugins = require("../../../plugins.js");
const { Client } = require("../../index.js");

Client.on("messageCreate", async (message) => {
  if (
    message.author.bot ||
    message.webhookId ||
    message.channel.type == "DM" ||
    !Client.isReady()
  )
    return;

  if (!message.content.startsWith(config.PREFIX)) return;

  let args = message.content.slice(config.PREFIX.length).trim().split(/ +/g);
  let msg = message.content.toLowerCase();
  let cmd = args.shift().toLowerCase();
  let sender = message.author;

  let command =
    Client.CommandCollection.get(cmd) ||
    Client.CommandCollection.find(
      (a) => a.help.aliases && a.help.aliases.includes(cmd)
    );

  if (!command) {
    plugins.message.forEach((plugin) => {
      if (existsSync(`./src/plugins/${plugin}`)) {
        const pluginInfo =
          require(`${process.cwd()}/src/plugins/${plugin}`).pluginInfo;
        if (pluginInfo.name == "DidYouMean")
          return require(`${process.cwd()}/src/plugins/${plugin}`).run(
            message,
            Client
          );
        else return;
      }
    });
    return;
  }

  try {
    command.run(Client, message, args, config.PREFIX);
    plugins.message.forEach((plugin) => {
      if (existsSync(`./src/plugins/${plugin}`)) {
        const pluginInfo =
          require(`${process.cwd()}/src/plugins/${plugin}`).pluginInfo;
        if (pluginInfo.name == "" || pluginInfo.name == "DidYouMean") return;
        require(`${process.cwd()}/src/plugins/${plugin}`).run(message, Client);
      }
    });
  } catch (e) {
    console.log(e);
  }
});

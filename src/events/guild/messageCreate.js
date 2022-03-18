const { existsSync } = require("fs");
const config = require("../../../config.js");
const plugins = require("../../../plugins.js");
const { Client } = require("../../index.js");

Client.on("messageCreate", async (message) => {
  //Returning if it meets a certain condition
  if (
    message.author.bot ||
    message.webhookId ||
    message.channel.type == "DM" ||
    !Client.isReady()
  )
    return;

  //Checking if starts with the prefix
  if (!message.content.startsWith(config.PREFIX)) return;

  //Get message content
  let args = message.content.slice(config.PREFIX.length).trim().split(/ +/g);
  let msg = message.content.toLowerCase();
  let cmd = args.shift().toLowerCase();
  let sender = message.author;

  //Check if is a command
  let command =
    Client.CommandCollection.get(cmd) ||
    Client.CommandCollection.find(
      (a) => a.help.aliases && a.help.aliases.includes(cmd)
    );

  //If isn't a command
  if (!command) {
    //If exists execute DidYouMean Plugin
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
    //Executing Command
    command.run(Client, message, args, config.PREFIX);

    //Reading and executing Plugins
    plugins.message.forEach((plugin) => {
      if (existsSync(`./src/plugins/${plugin}`)) {
        const pluginInfo =
          require(`${process.cwd()}/src/plugins/${plugin}`).pluginInfo;
        if (pluginInfo.name == "" || pluginInfo.name == "DidYouMean") return;
        require(`${process.cwd()}/src/plugins/${plugin}`).run(message, Client);
      }
    });
  } catch (e) {
    //Case error
    console.log(e);
  }
});

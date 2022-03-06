const { existsSync } = require("fs");
const config = require("../../../config.js");
const plugins = require(`${process.cwd()}/plugins.js`);
const { Client } = require("../../index.js");
const sleep = require(`${process.cwd()}/src/util/sleep.js`);
const translations = require(`${process.cwd()}/locales/${
  config.LANGUAGE
}/events.js`);

Client.on("ready", async () => {
  console.log(translations.ready.online(Client));

  const arrayOfSlashCommands = [];
  Client.SlashCollection.map((x) => {
    arrayOfSlashCommands.push(x.cmd);
  });

  await (
    await Client.guilds.fetch(config.GUILDID)
  ).commands.set(arrayOfSlashCommands);

  Client.Modules.map((x) => {
    x.run(Client);
  });
  plugins.ready.forEach((plugin) => {
    if (existsSync(`./src/plugins/${plugin}`)) {
      const pluginInfo =
        require(`${process.cwd()}/src/plugins/${plugin}`).pluginInfo;
      if (pluginInfo.name == "") return;
      require(`${process.cwd()}/src/plugins/${plugin}`).run(Client);
    }
  });

  (await Client.guilds.fetch(config.GUILDID)).commands.cache.forEach(
    (command) => {
      if (command.defaultPermission == false) {
        const commandPermissions = [];
        config.MODROLES.map((id) => {
          const permission = {
            id: id,
            type: "ROLE",
            permission: true,
          };
          commandPermissions.push(permission);
        });

        sleep(100);
        command.permissions.add({ permissions: commandPermissions });
      }
    }
  );
});

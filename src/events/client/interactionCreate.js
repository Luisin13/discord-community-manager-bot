const { Client } = require("../../index.js");

Client.on("interactionCreate", async (interaction) => {
  if (interaction.isCommand()) {
    let slashCmd = Client.SlashCollection.get(interaction.commandName);
    if (!slashCmd) return console.log("Not Found");
    try {
      slashCmd.run(interaction, Client);
    } catch (err) {
      console.log(err);
    }
  }
});

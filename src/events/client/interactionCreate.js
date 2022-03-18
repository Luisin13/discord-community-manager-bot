const { Client } = require("../../index.js");

Client.on("interactionCreate", async (interaction) => {
  if (interaction.isCommand()) {
    let slashCmd = Client.SlashCollection.get(interaction.commandName);
    if (!slashCmd) return;
    try {
      //Executing command
      slashCmd.run(interaction, Client);
    } catch (err) {
      console.log(err);
    }
  }
});

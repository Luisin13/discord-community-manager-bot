const { joinVoiceChannel } = require("@discordjs/voice");
const { Channel, Client, Guild } = require("discord.js");

module.exports = class MusicController {
  /**
   * @param {Client} client
   */
  constructor(client) {
    this.client = client;
    this.connection = null;
  }

  connection = this.connection;

  /**
   *
   * @param {Channel} channel
   * @param {Guild} guild
   */
  connect(channel, guild) {
    this.connection = joinVoiceChannel({
      channelId: channel.id,
      guildId: guild.id,
      adapterCreator: guild.voiceAdapterCreator,
    });
    return this.connection;
  }

  /**
   * @param {}
   **/
  disconnect() {
    return this.connection.disconnect();
  }
};

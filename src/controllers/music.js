const {
  joinVoiceChannel,
  createAudioPlayer,
  createAudioResource,
  StreamType,
  AudioPlayerStatus,
} = require("@discordjs/voice");
const { Channel, Client, Guild } = require("discord.js");
const ytdl = require("ytdl-core");
const ytpl = require("ytpl");

module.exports = class MusicController {
  /**
   * @param {Client} client
   */
  constructor(client) {
    this.client = client;
    this.guild;
    this.channel;
    this.connection;
    this.player = createAudioPlayer();
    this.queue = [];
    this.playing = false;
    this.currentQueuePosition = 0;
    this.loopMode = "none";
    this.player.on(AudioPlayerStatus.Idle, () => {
      if (this.loopMode === "none") {
        this.stop();
      } else if (this.loopMode === "song") {
        this.play(
          this.channel,
          this.guild,
          this.queue[this.currentQueuePosition]
        );
      } else if (this.loopMode === "queue") {
        this.skip();
      }
    });
  }

  /**
   *
   * @param {Channel} channel
   * @param {Guild} guild
   */
  connect(channel, guild) {
    this.guild = guild;
    this.channel = channel;
    this.connection = joinVoiceChannel({
      channelId: channel.id,
      guildId: guild.id,
      adapterCreator: guild.voiceAdapterCreator,
    });
    return this.connection;
  }

  disconnect() {
    this.playing = false;
    return this.connection.disconnect();
  }

  /**
   * @param {Channel} channel
   * @param {Guild} guild
   * @param {String} url
   * @returns {Promise<void> | "Invalid URL"}
   **/
  play(channel, guild, url) {
    if (ytdl.validateURL(url)) {
      if (!this.connection) this.connect(channel, guild);
      if (this.playing) {
        this.queue.push(url);
        return;
      } else {
        const stream = ytdl(url, { filter: "audioonly" }),
          resource = createAudioResource(stream, {
            inputType: StreamType.Arbitrary,
          });
        this.player.play(resource);
        this.connection.subscribe(this.player);
        this.playing = true;
        return this.player;
      }
    } else {
      return "Invalid URL";
    }
  }

  /**
   * @param {String} url
   * @returns {Promise<void> | "Invalid URL"}
   **/
  addToQueue(url) {
    if (ytdl.validateURL(url)) {
      this.queue.push(url);
      return this.queue;
    } else {
      return "Invalid URL";
    }
  }
  /**
   * @param {Channel} channel
   * @param {Guild} guild
   * @param {String} url
   * @returns {Promise<void> | "Invalid URL"}
   **/
  async loadPlaylist(channel, guild, url) {
    if (url.includes("youtube.com/playlist?list=")) {
      if (!this.connection) this.connect(channel, guild);
      let pl = (await ytpl(url)).items;
      pl = pl.sort((a, b) => a.index - b.index);
      this.currentQueuePosition = pl.length - 1;
      pl.forEach(async (item) => {
        await this.play(this.channel, this.guild, item.url.split("&list=")[0]);
      });
    } else {
      return "Invalid URL";
    }
  }

  canSkip() {
    return this.queue.length > 0;
  }

  skip() {
    this.player.stop();
    this.playing = false;
    if (this.queue.length > 0) {
      if (this.currentQueuePosition + 1 > this.queue.length - 1) {
        this.currentQueuePosition = 0;
      } else {
        this.currentQueuePosition++;
      }

      this.play(
        this.channel,
        this.guild,
        this.queue[this.currentQueuePosition]
      );
    }
  }

  stop() {
    this.player.stop();
    this.playing = false;
    this.currentQueuePosition = 0;
    this.loopMode = "none";
    this.queue = [];
  }

  /**
   * @param {String} mode
   **/
  loop(mode) {
    if (mode === "none" || this.loopMode === "queue") {
      this.loopMode = "none";
    } else if (mode === "song" || this.loopMode === "none") {
      this.loopMode = "song";
    } else if (mode === "queue" || this.loopMode === "song") {
      this.loopMode = "queue";
    } else {
      return "Invalid mode";
    }
    return this.loopMode;
  }
  static connection = this.connection;
  static player = this.player;
  static queue = this.queue;
  static playing = this.playing;
  static currentQueuePosition = this.currentQueuePosition;
  static loopMode = this.loopMode;
};

const { User } = require("discord.js");

module.exports = {
  ping: {
    /**
     *
     * @param {Number} ping
     * @param {Number} API
     */
    pingEmbed: (ping, API) => {
      return `**⏱|Your ping:**\n${ping} ms\n**⚡|API:**\n${API} ms`;
    },
    calculating: () => {
      return `Calculating...`;
    },
    description: () => {
      return `Measure your ping, and from the Discord API`;
    },
    category: () => {
      return "utility";
    },
  },
  plugins: {
    author: () => {
      return `Author`;
    },
    noPlugins: () => {
      return `No plugins!`;
    },
    description: () => {
      return "Look at the plugins in the bot";
    },
    category: () => {
      return "moderation";
    },
    noPermission: () => {
      return "You don't have permission to use this command!";
    },
  },
  modules: {
    author: () => {
      return `Author`;
    },
    noModules: () => {
      return `No modules!`;
    },
    description: () => {
      return "Look at the modules in the bot";
    },
    category: () => {
      return "moderation";
    },
    noPermission: () => {
      return "You don't have permission to use this command!";
    },
  },
  ban: {
    description: () => {
      return `Bans a user`;
    },
    category: () => {
      return `moderation`;
    },
    user: () => {
      return `user`;
    },
    userDescription: () => {
      return `User to be banned!`;
    },
    reason: () => {
      return `reason`;
    },
    reasonDescription: () => {
      return `Reason to be banned!`;
    },
    noReason: () => {
      return `No reason specified!`;
    },
    messages: () => {
      return `messages`;
    },
    messagesDescription: () => {
      return `Number of days to delete messages!`;
    },
    banYourself: () => {
      return `You can't ban yourself!`;
    },
    banOwner: () => {
      return `You can't ban the server owner!`;
    },
    lowerRole: () => {
      return `You can't ban a user with roles greater or egual to yours!`;
    },
    lowerBotRole: () => {
      return `You can't ban a user with roles greater or equal to the bot!`;
    },
    banBot: () => {
      return `You can't ban me!`;
    },
    /**
     *
     * @param {User} user
     */
    success: (user) => {
      return `${user} banned successfully!`;
    },
    error: () => {
      return `Error while banning the user!`;
    },
    noPermission: () => {
      return `You don't have permission to use this command!`;
    },
    noUser: () => {
      return `No user specified!`;
    },
  },
  kick: {
    description: () => {
      return `Kicks a user`;
    },
    category: () => {
      return `moderation`;
    },
    user: () => {
      return `user`;
    },
    userDescription: () => {
      return `User to be kicked!`;
    },
    reason: () => {
      return `reason`;
    },
    reasonDescription: () => {
      return `Reason to be kicked!`;
    },
    noReason: () => {
      return `No reason specified!`;
    },
    kickYourself: () => {
      return `You can't kick yourself!`;
    },
    kickOwner: () => {
      return `You can't kick the server owner!`;
    },
    lowerRole: () => {
      return `You can't kick a user with roles greater or egual to yours!`;
    },
    lowerBotRole: () => {
      return `You can't kick a user with roles greater or equal to the bot!`;
    },
    kickBot: () => {
      return `You can't kick me!`;
    },
    /**
     *
     * @param {User} user
     */
    success: (user) => {
      return `${user} kicked successfully!`;
    },
    error: () => {
      return `Error while kicking the user!`;
    },
    noPermission: () => {
      return `You don't have permission to use this command!`;
    },
    noUser: () => {
      return `No user specified!`;
    },
  },
  mute: {
    description: () => {
      return `Mutes a user`;
    },
    category: () => {
      return `moderation`;
    },
    user: () => {
      return `user`;
    },
    userDescription: () => {
      return `User to be muted!`;
    },
    reason: () => {
      return `reason`;
    },
    reasonDescription: () => {
      return `Reason to be muted!`;
    },
    time: () => {
      return `time`;
    },
    timeDescription: () => {
      return `Time to be muted!`;
    },
    timeFormat: () => {
      return `quantity`;
    },
    timeFormatDescription: () => {
      return `Format of the time to be muted!`;
    },
    timeFormatChoices: () => {
      return {
        minutes: `minutes`,
        hours: `hours`,
        days: `days`,
      };
    },
    noReason: () => {
      return `No reason specified!`;
    },
    muteYourself: () => {
      return `You can't mute yourself!`;
    },
    muteOwner: () => {
      return `You can't mute the server owner!`;
    },
    lowerRole: () => {
      return `You can't mute a user with roles greater or egual to yours!`;
    },
    lowerBotRole: () => {
      return `You can't mute a user with roles greater or equal to the bot!`;
    },
    muteBot: () => {
      return `You can't mute me!`;
    },
    /**
     * @param {User} User
     */
    success: (User) => {
      return `${User} muted successfully!`;
    },
    error: () => {
      return `Error while muting the user!`;
    },
    noPermission: () => {
      return `You don't have permission to use this command!`;
    },
    noUser: () => {
      return `No user specified!`;
    },
    tooLong: () => {
      return `The time cannot exceed 7 days!`;
    },
  },
  unmute: {
    description: () => {
      return `Unmutes a user`;
    },
    category: () => {
      return `moderation`;
    },
    user: () => {
      return `user`;
    },
    userDescription: () => {
      return `User to be unmuted!`;
    },
    reason: () => {
      return `reason`;
    },
    reasonDescription: () => {
      return `Reason to be unmuted!`;
    },
    noReason: () => {
      return `No reason specified!`;
    },
    unmuteYourself: () => {
      return `You can't unmute yourself!`;
    },
    unmuteOwner: () => {
      return `You can't unmute the server owner!`;
    },
    lowerRole: () => {
      return `You can't unmute a user with roles greater or egual to yours!`;
    },
    lowerBotRole: () => {
      return `You can't unmute a user with roles greater or equal to the bot!`;
    },
    unmuteBot: () => {
      return `You can't unmute me!`;
    },
    /**
     * @param {User} User
     **/
    success: (User) => {
      return `${User} unmuted successfully!`;
    },
    error: () => {
      return `Error while unmuting the user!`;
    },
    noPermission: () => {
      return `You don't have permission to use this command!`;
    },
  },
  clear: {
    description: () => {
      return `Clears a number of messages in channel`;
    },
    category: () => {
      return `moderation`;
    },
    amount: () => {
      return `amount`;
    },
    amountDescription: () => {
      return `Amount of messages to be deleted!`;
    },
    noAmount: () => {
      return `No amount specified!`;
    },
    noPermission: () => {
      return `You don't have permission to use this command!`;
    },
    /**
     * @param {number} amount
     **/
    success: (amount) => {
      return `${amount} messages deleted successfully!`;
    },
    error: () => {
      return `Error while deleting messages!`;
    },
    tooMany: () => {
      return `You can't delete more than 100 messages at once!`;
    },
  },
  avatar: {
    description: () => {
      return `Shows the avatar of a user`;
    },
    category: () => {
      return `utility`;
    },
    user: () => {
      return `user`;
    },
    userDescription: () => {
      return `User to get the avatar of!`;
    },
    openBrowser: () => {
      return `Open in browser`;
    },
    error: () => {
      return `Error while getting the avatar!`;
    },
  },
  banner: {
    description: () => {
      return `Shows the banner of a user`;
    },
    category: () => {
      return `utility`;
    },
    user: () => {
      return `user`;
    },
    userDescription: () => {
      return `User to get the banner of!`;
    },
    openBrowser: () => {
      return `Open in browser`;
    },
    error: () => {
      return `Error while getting the banner!`;
    },
    /**
     * @param {String} color
     */
    color: (color) => {
      return `**The user don't have a banner!** \nHere is the accent color instead! \n(hex: ${color})`;
    },
  },
  connect: {
    description: () => {
      return `Connects to a voice channel`;
    },
    category: () => {
      return `music`;
    },
    error: () => {
      return `Error while connecting to the channel!`;
    },
    success: () => {
      return `Connected to the channel!`;
    },
    noVoiceChannel: () => {
      return `You need to be in a voice channel!`;
    },
  },
  disconnect: {
    description: () => {
      return `Disconnects from a voice channel`;
    },
    category: () => {
      return `music`;
    },
    error: () => {
      return `Error while disconnecting from the channel!`;
    },
    success: () => {
      return `Disconnected from the channel!`;
    },
    noVoiceChannel: () => {
      return `You need to be in a voice channel!`;
    },
    noConnection: () => {
      return `I'm not connected to a voice channel!`;
    },
  },
  play: {
    description: () => {
      return `Plays a song`;
    },
    category: () => {
      return `music`;
    },
    error: () => {
      return `Error while playing the song!`;
    },
    success: () => {
      return `Playing the song!`;
    },
    noSong: () => {
      return `No song specified!`;
    },
    noVoiceChannel: () => {
      return `You need to be in a voice channel!`;
    },
    addToQueue: () => {
      return `Added to queue!`;
    },
  },
  skip: {
    description: () => {
      return `Skips a song`;
    },
    category: () => {
      return `music`;
    },
    error: () => {
      return `Error while skipping the song!`;
    },
    success: () => {
      return `Skipped the song!`;
    },
    noSong: () => {
      return `No song specified!`;
    },
    noVoiceChannel: () => {
      return `You need to be in a voice channel!`;
    },
    noConnection: () => {
      return `I'm not connected to a voice channel!`;
    },
    cantSkip: () => {
      return `I can't skip the song!`;
    },
  },
  stop: {
    description: () => {
      return `Stops the music and clears the queue`;
    },
    category: () => {
      return `music`;
    },
    error: () => {
      return `Error while stopping the music!`;
    },
    success: () => {
      return `Stopped the music and cleaned the queue!`;
    },
    noSong: () => {
      return `No song found!`;
    },
    noVoiceChannel: () => {
      return `You need to be in a voice channel!`;
    },
    noConnection: () => {
      return `I'm not connected to a voice channel!`;
    },
  },
  loop: {
    description: () => {
      return `Loops the current song or queue`;
    },
    category: () => {
      return `music`;
    },
    error: () => {
      return `Error while activating the loop!`;
    },
    /**
     *
     * @param {"song" | "queue"} mode
     */
    success: (mode) => {
      return `Loop **${mode}** activated!`;
    },
    noSong: () => {
      return `No song found!`;
    },
    noVoiceChannel: () => {
      return `You need to be in a voice channel!`;
    },
    noConnection: () => {
      return `I'm not connected to a voice channel!`;
    },
    loopModes: {
      queue: () => {
        return `queue`;
      },
      song: () => {
        return `music`;
      },
      none: () => {
        return `none`;
      },
    },
  },
};

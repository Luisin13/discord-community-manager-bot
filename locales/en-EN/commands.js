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
      return `No plugins!`
    },
    description: () => {
      return "Look at the plugins in the bot";
    },
    category: () => {
      return "utility";
    },
  },
  ban: {
    banDescription: () => {
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
  },
};

const { Client } = require("discord.js")

module.exports = {
  ready: {
    /**
     * 
     * @param {Client} bot 
     */
    online: (bot) => {
      return `${bot.user.tag} is online!`
    }
  }
}
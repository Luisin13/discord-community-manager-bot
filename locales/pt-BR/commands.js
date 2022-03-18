const { User } = require("discord.js");

module.exports = {
  ping: {
    /**
     *
     * @param {Number} ping
     * @param {Number} API
     */
    pingEmbed: (ping, API) => {
      return `**⏱|Seu ping:**\n${ping} ms\n**⚡|API:**\n${API} ms`;
    },
    calculating: () => {
      return `Calculando...`;
    },
    description: () => {
      return `Mede o seu ping, e da API do Discord`;
    },
    category: () => {
      return "utilidade";
    },
  },
  plugins: {
    author: () => {
      return `Autor`;
    },
    noPlugins: () => {
      return `Nenhum plugin!`
    },
    description: () => {
      return "Olha os plugins instalados no bot";
    },
    category: () => {
      return "utilidade";
    },
  },
  ban: {
    banDescription: () => {
      return `Bane um usuário`;
    },
    category: () => {
      return `moderação`;
    },
    user: () => {
      return `usuário`;
    },
    userDescription: () => {
      return `Usuário a ser banido!`;
    },
    reason: () => {
      return `motivo`;
    },
    reasonDescription: () => {
      return `Motivo para ser banido!`;
    },
    noReason: () => {
      return `Sem motivo especificado!`;
    },
    messages: () => {
      return `mensagens`;
    },
    messagesDescription: () => {
      return `Número de dias para deletar as mensagens!`;
    },
    banYourself: () => {
      return `Você não pode se banir!`;
    },
    banOwner: () => {
      return `Você não pode banir o dono do servidor!`;
    },
    lowerRole: () => {
      return `Você não poder banir alguém com um cargo maior ou igual que o seu!`;
    },
    lowerBotRole: () => {
      return `Você não poder banir alguém com um cargo maior ou igual ao meu!`;
    },
    banBot: () => {
      return `Você não pode me banir!`;
    },
    /**
     *
     * @param {User} user
     */
    success: (user) => {
      return `${user} banido com sucesso!`;
    },
    error: () => {
      return `Erro ao banir o usuário!`;
    },
  },
};

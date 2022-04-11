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
      return `Nenhum plugin!`;
    },
    description: () => {
      return "Olha os plugins instalados no bot";
    },
    category: () => {
      return "moderação";
    },
    noPermission: () => {
      return "Você não tem permissão para usar este comando!";
    },
  },
  modules: {
    author: () => {
      return `Author`;
    },
    noModules: () => {
      return `Nenhum módulo!`;
    },
    description: () => {
      return "Olha os módulos instalados no bot";
    },
    category: () => {
      return "moderação";
    },
    noPermission: () => {
      return "Você não tem permissão para usar este comando!";
    },
  },
  ban: {
    description: () => {
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
    noPermission: () => {
      return `Você não tem permissão para usar este comando!`;
    },
    noUser: () => {
      return `Nenhum usuário encontrado!`;
    },
  },
  kick: {
    description: () => {
      return `Expulsa um usuário`;
    },
    category: () => {
      return `moderação`;
    },
    user: () => {
      return `usuário`;
    },
    userDescription: () => {
      return `Usurário a ser expulso!`;
    },
    reason: () => {
      return `motivo`;
    },
    reasonDescription: () => {
      return `Motivo para ser expulso!`;
    },
    noReason: () => {
      return `Nenhum motivo especificado!`;
    },
    kickYourself: () => {
      return `Você não pode se expulsar!`;
    },
    kickOwner: () => {
      return `Você não pode expulsar o dono do servidor!`;
    },
    lowerRole: () => {
      return `Você não poder expulsar alguém com um cargo maior ou igual que o seu!`;
    },
    lowerBotRole: () => {
      return `Você não poder expulsar alguém com um cargo maior ou igual ao meu!`;
    },
    kickBot: () => {
      return `Você não pode me expulsar!`;
    },
    /**
     *
     * @param {User} user
     */
    success: (user) => {
      return `${user} expulso com sucesso!`;
    },
    error: () => {
      return `Erro ao expulsar o usuário!`;
    },
    noPermission: () => {
      return `Você não tem permissão para usar este comando!`;
    },
    noUser: () => {
      return `Nenhum usuário encontrado!`;
    },
  },
  mute: {
    description: () => {
      return `Silencia um usuário`;
    },
    category: () => {
      return `moderação`;
    },
    user: () => {
      return `usuário`;
    },
    userDescription: () => {
      return `Usuário a ser silenciado!`;
    },
    reason: () => {
      return `motivo`;
    },
    reasonDescription: () => {
      return `Motivo para ser silenciado!`;
    },
    time: () => {
      return `tempo`;
    },
    timeDescription: () => {
      return `Tempo para ser silenciado!`;
    },
    timeFormat: () => {
      return `quantidade`;
    },
    timeFormatDescription: () => {
      return `Formato de tempo para ser silenciado!`;
    },
    timeFormatChoices: () => {
      return {
        minutes: `minutos`,
        hours: `horas`,
        days: `dias`,
      };
    },
    noReason: () => {
      return `Nenhum motivo especificado!`;
    },
    muteYourself: () => {
      return `Você não pode se silenciar!`;
    },
    muteOwner: () => {
      return `Você não pode silenciar o dono do servidor!`;
    },
    lowerRole: () => {
      return `Você não poder silenciar alguém com um cargo maior ou igual que o seu!`;
    },
    lowerBotRole: () => {
      return `Você não poder silenciar alguém com um cargo maior ou igual ao meu!`;
    },
    muteBot: () => {
      return `Você não pode me silenciar!`;
    },
    /**
     * @param {User} user
     * */
    success: (user) => {
      return `${user} silenciado com sucesso!`;
    },
    error: () => {
      return `Erro ao silenciar o usuário!`;
    },
    noPermission: () => {
      return `Você não tem permissão para usar este comando!`;
    },
    noUser: () => {
      return `Nenhum usuário encontrado!`;
    },
    tooLong: () => {
      return `O tempo máximo para silenciar é 7 dias!`;
    },
  },
  unmute: {
    description: () => {
      return `Desilencia um usuário`;
    },
    category: () => {
      return `moderação`;
    },
    user: () => {
      return `usuário`;
    },
    userDescription: () => {
      return `Usuário a ser desilenciado!`;
    },
    reason: () => {
      return `motivo`;
    },
    reasonDescription: () => {
      return `Motivo para ser desilenciado!`;
    },
    noReason: () => {
      return `Nenhum motivo especificado!`;
    },
    unmuteYourself: () => {
      return `Você não pode se desilenciar!`;
    },
    unmuteOwner: () => {
      return `Você não pode desilenciar o dono do servidor!`;
    },
    lowerRole: () => {
      return `Você não poder desilenciar alguém com um cargo maior ou igual que o seu!`;
    },
    lowerBotRole: () => {
      return `Você não poder desilenciar alguém com um cargo maior ou igual ao meu!`;
    },
    /**
     * @param {User} user
     * */
    success: (user) => {
      return `${user} desilenciado com sucesso!`;
    },
    error: () => {
      return `Erro ao desilenciar o usuário!`;
    },
    noPermission: () => {
      return `Você não tem permissão para usar este comando!`;
    },
  },
  clear: {
    description: () => {
      return `Limpa uma quantidade de mensagens`;
    },
    category: () => {
      return `moderação`;
    },
    amount: () => {
      return `quantidade`;
    },
    amountDescription: () => {
      return `Quantidade de mensagens a ser limpa!`;
    },
    noAmount: () => {
      return `Nenhuma quantidade especificada!`;
    },
    noPermission: () => {
      return `Você não tem permissão para usar este comando!`;
    },
    /**
     * @param {number} amount
     **/
    success: (amount) => {
      return `${amount} mensagens apagadas com sucesso!`;
    },
    error: () => {
      return `Erro ao apagar as mensagens!`;
    },
    tooMany: () => {
      return `Você não pode apagar mais de 100 mensagens!`;
    },
  },
  avatar: {
    description: () => {
      return `Mostra o avatar de um usuário`;
    },
    category: () => {
      return `utilidades`;
    },
    user: () => {
      return `usuário`;
    },
    userDescription: () => {
      return `Usuário a ser mostrado o avatar!`;
    },
    openBrowser: () => {
      return `Abrir no navegador`;
    },
    error: () => {
      return `Erro ao mostrar o avatar!`;
    },
  },
  banner: {
    description: () => {
      return `Mostra o banner de um usuário`;
    },
    category: () => {
      return `utilidades`;
    },
    user: () => {
      return `usuário`;
    },
    userDescription: () => {
      return `Usuário a ser mostrado o banner!`;
    },
    openBrowser: () => {
      return `Abrir no navegador`;
    },
    error: () => {
      return `Erro ao mostrar o banner!`;
    },
    /**
     * @param {string} color
     */
    color: (color) => {
      return `**O usuário não tem um banner!** \nAqui está a cor de destaque em vez disso! \n(hex: ${color})`;
    },
  },
  connect: {
    description: () => {
      return `Conecta a um canal de voz`;
    },
    category: () => {
      return `musica`;
    },
    error: () => {
      return `Erro ao conectar ao canal de voz!`;
    },
    success: () => {
      return `Conectado com sucesso!`;
    },
    noVoiceChannel: () => {
      return `Você precisa estar em um canal de voz!`;
    },
  },
  disconnect: {
    description: () => {
      return `Desconecta do canal de voz`;
    },
    category: () => {
      return `musica`;
    },
    error: () => {
      return `Erro ao desconectar do canal de voz!`;
    },
    success: () => {
      return `Desconectado com sucesso!`;
    },
    noVoiceChannel: () => {
      return `Você precisa estar em um canal de voz!`;
    },
    noConnection: () => {
      return `Não estou conectado a um canal de voz!`;
    },
  },
  play: {
    description: () => {
      return `Toca uma música`;
    },
    category: () => {
      return `musica`;
    },
    error: () => {
      return `Erro ao tocar a música!`;
    },
    success: () => {
      return `Tocando a música!`;
    },
    noSong: () => {
      return `Nenhuma música encontrada!`;
    },
    noVoiceChannel: () => {
      return `Você precisa estar em um canal de voz!`;
    },
    addToQueue: () => {
      return `Adicionado a fila!`;
    },
  },
  skip: {
    description: () => {
      return `Pula a música atual`;
    },
    category: () => {
      return `musica`;
    },
    error: () => {
      return `Erro ao pular a música!`;
    },
    success: () => {
      return `Música pulada!`;
    },
    noSong: () => {
      return `Nenhuma música encontrada!`;
    },
    noVoiceChannel: () => {
      return `Você precisa estar em um canal de voz!`;
    },
    noConnection: () => {
      return `Não estou conectado a um canal de voz!`;
    },
    cantSkip: () => {
      return `Não posso pular a música atual!`;
    },
  },
  stop: {
    description: () => {
      return `Para a música atual e limpa a fila`;
    },
    category: () => {
      return `musica`;
    },
    error: () => {
      return `Erro ao parar a música!`;
    },
    success: () => {
      return `Música parada e fila limpa!`;
    },
    noSong: () => {
      return `Nenhuma música encontrada!`;
    },
    noVoiceChannel: () => {
      return `Você precisa estar em um canal de voz!`;
    },
    noConnection: () => {
      return `Não estou conectado a um canal de voz!`;
    },
  },
  loop: {
    description: () => {
      return `Repete a música atual ou fila`;
    },
    category: () => {
      return `musica`;
    },
    error: () => {
      return `Erro ao ativar a repetição!`;
    },
    success: () => {
      return `Repetição ativada!`;
    },
    noSong: () => {
      return `Nenhuma música encontrada!`;
    },
    noVoiceChannel: () => {
      return `Você precisa estar em um canal de voz!`;
    },
    noConnection: () => {
      return `Não estou conectado a um canal de voz!`;
    },
    loopModes: {
      queue: () => {
        return `fila`;
      },
      song: () => {
        return `musica`;
      },
      none: () => {
        return `nenhuma`;
      },
    },
  },
};

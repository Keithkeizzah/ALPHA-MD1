const { zokou: startGame } = require("../framework/zokou");
const axios = require("axios");
const { wcgCache } = require("../framework/wcg");

const gameDetails = {
  nomCom: "wcg",
  categorie: "Games",
  reaction: '🎮',
  desc: "Play a game of World Chains Games, a word game."
};

startGame(gameDetails, async (chatId, chatClient, context) => {
  const { repondre: respond, ms, arg, auteurMessage: authorMessage } = context;

  if (wcgCache.has(chatId)) {
    return respond("A game is already in progress in this chat.");
  }

  wcgCache.set(chatId, authorMessage);
  
  const initialMessage = {
    text: "🌟 Initializing the WCG (Word Chains Game) ... 🌟\n⏳ To join the game, please send *join* (without any prefix) in the chat.\n🚀 The game starts in 60 seconds! 🎉"
  };
  chatClient.sendMessage(chatId, initialMessage);

  let participants = [];
  let gameStarted = false;
  let countdownInterval;

  new Promise((resolve, reject) => {
    let timeLeft = 60; // 60 seconds countdown

    countdownInterval = setInterval(() => {
      timeLeft -= 10; // Decrease by 10 seconds
      if (timeLeft <= 0) {
        gameStarted = true;
        resolve();
      } else {
        const countdownMessage = {
          text: `🚀 The game starts in ${timeLeft} seconds! 🎉\nSend *join* to participate in the game.`
        };
        chatClient.sendMessage(chatId, countdownMessage);
      }
    }, 10000); // 10 seconds interval
  }).then(() => {
    clearInterval(countdownInterval);
    chatClient.ev.off("messages.upsert", messageHandler);
    wcgCache.delete(chatId);

    if (participants.length === 0) {
      return chatClient.sendMessage(chatId, {
        text: "No participants for the WCG, so the game is canceled."
      });
    }

    chatClient.sendMessage(chatId, {
      text: `🎉 The game starts with the following participants:\n${participants.map(p => '@' + p.split('@')[0]).join("\n")} 🚀`,
      mentions: participants
    });

    chatClient.StartWcgGame(chatId, participants);
  });

  const messageHandler = async (update) => {
    const { type, messages } = update;
    if (type === "notify") {
      const message = messages[0];
      const senderJid = message.key.remoteJid;
      const isGroup = senderJid.endsWith("@g.us");
      const isBroadcast = senderJid === "status@broadcast";
      const senderId = message.key.fromMe 
        ? chatClient.user.id.replace(/:.*@/g, '@') 
        : isGroup || isBroadcast 
          ? message.key.participant.replace(/:.*@/g, '@') 
          : senderJid;

      const textMessage = message.message?.["conversation"]?.trim()?.toLowerCase() || 
                          message.message?.["extendedTextMessage"]?.["text"]?.trim()?.toLowerCase();

      if (!textMessage) return;

      if (textMessage === "join" && !participants.includes(senderId) && !gameStarted && senderJid === chatId) {
        console.log("A new participant has joined WCG");
        participants.push(senderId);
        console.log(participants);
        chatClient.sendMessage(chatId, {
          text: `@${senderId.split('@')[0]} has joined the game.`,
          mentions: [senderId]
        });
      }
    }
  };

  chatClient.ev.on("messages.upsert", messageHandler);
});

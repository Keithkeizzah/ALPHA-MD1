const {zokou} = require("../framework/zokou");
const axios = require('axios');
const traduire = require('../framework/traduction')



zokou({
    nomCom: "wcg",
    categorie: "Games",
    reaction: "📺"
  },

a28_0x12800c(a28_0x1c3701, async (discussionId, messageSender, context) => {
  const {
    reply: sendMessage,
    ms: msVariable,
    arg: argVariable,
    authorMessage: author
  } = context;

  // Check if a game is already in progress
  if (a28_0x1713ff.has(discussionId)) {
    return sendMessage("A game is already in progress in this discussion.");
  }

  a28_0x1713ff.set(discussionId, author);
  
  // Initial message for starting the game
  const initialMessage = {
    text: "🌟 Initializing WCG (Word Chains Game) ... 🌟\n⏳ To join the game, please send *partant* (without any prefix) in the discussion.\n🚀 The game starts in 60 seconds! 🎉"
  };
  messageSender.sendMessage(discussionId, initialMessage);
  
  let participants = [];
  let isTimeUp = false;
  let timer;

  // Countdown timer for starting the game
  new Promise((resolve) => {
    let countdown = 60; // countdown in seconds
    timer = setInterval(() => {
      countdown -= 10;
      if (countdown <= 0) {
        isTimeUp = true;
        resolve();
      } else {
        const countdownMessage = {
          text: "🚀 The game starts in " + countdown + " seconds! 🎉\n Send *partant* to join the game."
        };
        messageSender.sendMessage(discussionId, countdownMessage);
      }
    }, 10000); // interval of 10 seconds
  }).then(() => {
    clearInterval(timer);
    messageSender.ev.off("messages.upsert", messageHandler);
    a28_0x1713ff.delete(discussionId);

    if (participants.length === 0) {
      return messageSender.sendMessage(discussionId, {
        text: "No participants for the WCG game. The game is therefore canceled."
      });
    }

    // Start the game with the participants
    messageSender.sendMessage(discussionId, {
      text: "🎉 The game starts with the following participants:\n" + 
            participants.map(participant => '@' + participant.split('@')[0]).join("\n") + " 🚀",
      mentions: participants
    });
    messageSender.StartWcgGame(discussionId, participants);
  });

  // Message handler for participant joining
  const messageHandler = async (messageEvent) => {
    const {
      type,
      messages
    } = messageEvent;

    if (type === "notify") {
      const message = messages[0];
      const remoteJid = message.key.remoteJid;
      const isGroupChat = remoteJid.endsWith("@g.us");
      const isBroadcast = remoteJid === "status@broadcast";
      const senderId = message.key.fromMe 
        ? messageSender.user.id.replace(/:.*@/g, '@') 
        : isGroupChat || isBroadcast 
          ? message.key.participant.replace(/:.*@/g, '@') 
          : remoteJid;

      const command = message.message?.["conversation"]?.trim()?.toLowerCase() || 
                      message.message?.["extendedTextMessage"]?.["text"]?.trim()?.toLowerCase();

      if (!command) {
        return;
      }

      if (command === "partant" && !participants.includes(senderId) && !isTimeUp && remoteJid === discussionId) {
        console.log("A new participant has joined WCG");
        participants.push(senderId);
        console.log(participants);
        
        messageSender.sendMessage(discussionId, {
          text: '@' + senderId.split('@')[0] + " has joined the game.",
          mentions: [senderId]
        });
      }
    }
  };

  messageSender.ev.on("messages.upsert", messageHandler);
});

const { keith } = require("../keizzah/keith");
const axios = require('axios');
const { writeFile } = require("fs/promises");


keith({
  nomCom: "hwaifu",
  categorie: "Hentai",
  reaction: "🙄"
}, async (origineMessage, zk, commandeOptions) => {
  const { repondre, ms } = commandeOptions;
  const url = 'https://api.waifu.pics/nsfw/waifu'; // Replace with your actual URL

  try {
    for (let i = 0; i < 5; i++) {
      const response = await axios.get(url);
      const imageUrl = response.data.url;

      zk.sendMessage(origineMessage, { image: { url: imageUrl } }, { caption: "*Powered by Alpha Md*", quoted: ms });
    }
  } catch (error) {
    repondre('Erreur lors de la récupération des données : ' + error);
  }
});

///////////// hneko //////////
keith({
  nomCom: "trap",
  categorie: "Hentai",
  reaction: "🙄"
}, async (origineMessage, zk, commandeOptions) => {
  const { repondre, ms } = commandeOptions;
  const url = 'https://api.waifu.pics/nsfw/trap'; // Replace with your actual URL

  try {
    for (let i = 0; i < 5; i++) {
      const response = await axios.get(url);
      const imageUrl = response.data.url;

      zk.sendMessage(origineMessage, { image: { url: imageUrl } }, { caption: "*Powered by Alpha Md*", quoted: ms });
    }
  } catch (error) {
    repondre('Erreur lors de la récupération des données : ' + error);
  }
});

keith({
  nomCom: "hneko",
  categorie: "Hentai",
  reaction: "🙄"
}, async (origineMessage, zk, commandeOptions) => {
  const { repondre, ms } = commandeOptions;
  const url = 'https://api.waifu.pics/nsfw/neko'; // Replace with your actual URL

  try {
    for (let i = 0; i < 5; i++) {
      const response = await axios.get(url);
      const imageUrl = response.data.url;

      zk.sendMessage(origineMessage, { image: { url: imageUrl } }, { caption: "*Powered by Alpha Md*", quoted: ms });
    }
  } catch (error) {
    repondre('Erreur lors de la récupération des données : ' + error);
  }
});

keith({
  nomCom: "blowjob",
  categorie: "Hentai",
  reaction: "🙄"
}, async (origineMessage, zk, commandeOptions) => {
  const { repondre, ms } = commandeOptions;
  const url = 'https://api.waifu.pics/nsfw/blowjob'; // Replace with your actual URL

  try {
    for (let i = 0; i < 5; i++) {
      const response = await axios.get(url);
      const imageUrl = response.data.url;

      zk.sendMessage(origineMessage, { image: { url: imageUrl } }, { caption: "*Powered by Alpha Md*", quoted: ms });
    }
  } catch (error) {
    repondre('Erreur lors de la récupération des données : ' + error);
  }
});

keith({
  nomCom: "ass",
  categorie: "Hentai",
  reaction: "🙄"
},
async (origineMessage, zk, commandeOptions) => {
  const { repondre, ms } = commandeOptions;

  const url = 'https://shizoapi.onrender.com/api/nsfw/ass?apikey=shizo'; // Remplace avec ton lien réel

  try { for (let i = 0 ; i < 5 ; i++ ) {
    const response = await axios.get(url);
    const imageUrl = response.data.url;

    zk.sendMessage(origineMessage, { image: { url: imageUrl } }, { quoted: ms }); }
  } catch (error) {
    repondre('Erreur lors de la récupération des données : ' +error);
  }
});
keith({
  nomCom: "masterbation",
  categorie: "Hentai",
  reaction: "🙄"
},
async (origineMessage, zk, commandeOptions) => {
  const { repondre, ms } = commandeOptions;

  const url = 'https://shizoapi.onrender.com/api/nsfw/masterbation?apikey=shizo'; // Remplace avec ton lien réel

  try { for (let i = 0 ; i < 5 ; i++ ) {
    const response = await axios.get(url);
    const imageUrl = response.data.url;

    zk.sendMessage(origineMessage, { image: { url: imageUrl } }, { quoted: ms }); }
  } catch (error) {
    repondre('Erreur lors de la récupération des données : ' +error);
  }
});
keith({
  nomCom: "thigh",
  categorie: "Hentai",
  reaction: "🙄"
},
async (origineMessage, zk, commandeOptions) => {
  const { repondre, ms } = commandeOptions;

  const url = 'https://shizoapi.onrender.com/api/nsfw/thigh?apikey=shizo'; // Remplace avec ton lien réel

  try { for (let i = 0 ; i < 5 ; i++ ) {
    const response = await axios.get(url);
    const imageUrl = response.data.url;

    zk.sendMessage(origineMessage, { image: { url: imageUrl } }, { quoted: ms }); }
  } catch (error) {
    repondre('Erreur lors de la récupération des données : ' +error);
  }
});
keith({
  nomCom: "panty",
  categorie: "Hentai",
  reaction: "🙄"
},
async (origineMessage, zk, commandeOptions) => {
  const { repondre, ms } = commandeOptions;

  const url = 'https://shizoapi.onrender.com/api/nsfw/panty?apikey=shizo'; // Remplace avec ton lien réel

  try { for (let i = 0 ; i < 5 ; i++ ) {
    const response = await axios.get(url);
    const imageUrl = response.data.url;

    zk.sendMessage(origineMessage, { image: { url: imageUrl } }, { quoted: ms }); }
  } catch (error) {
    repondre('Erreur lors de la récupération des données : ' +error);
  }
});


// Send waifu images
keith({
  nomCom: 'waifu',
  categorie: "Weeb",
  reaction: '😏'
}, async (user, bot, message) => {
  const { repondre: respond, ms: quotedMessage } = message;
  try {
    for (let i = 0; i < 5; i++) {
      const response = await axios.get('https://api.waifu.pics/sfw/waifu');
      const imageUrl = response.data.url;
      bot.sendMessage(user, { image: { url: imageUrl } }, { quoted: quotedMessage });
    }
  } catch (error) {
    respond("Error occurred while retrieving the data:", error);
  }
});

// Send neko images
keith({
  nomCom: "neko",
  categorie: 'Weeb',
  reaction: '😺'
}, async (user, bot, message) => {
  const { repondre: respond, ms: quotedMessage } = message;
  try {
    for (let i = 0; i < 5; i++) {
      const response = await axios.get("https://api.waifu.pics/sfw/neko");
      const imageUrl = response.data.url;
      bot.sendMessage(user, { image: { url: imageUrl } }, { quoted: quotedMessage });
    }
  } catch (error) {
    respond("Error occurred while retrieving the data:", error);
  }
});

// Send shinobu images
keith({
  nomCom: 'shinobu',
  categorie: "Weeb",
  reaction: '🦋'
}, async (user, bot, message) => {
  const { repondre: respond, ms: quotedMessage } = message;
  try {
    for (let i = 0; i < 5; i++) {
      const response = await axios.get('https://api.waifu.pics/sfw/shinobu');
      const imageUrl = response.data.url;
      bot.sendMessage(user, { image: { url: imageUrl } }, { quoted: quotedMessage });
    }
  } catch (error) {
    respond("Error occurred while retrieving the data:", error);
  }
});

// Send megumin images
keith({
  nomCom: 'megumin',
  categorie: "Weeb",
  reaction: '💥'
}, async (user, bot, message) => {
  const { repondre: respond, ms: quotedMessage } = message;
  try {
    for (let i = 0; i < 5; i++) {
      const response = await axios.get("https://api.waifu.pics/sfw/megumin");
      const imageUrl = response.data.url;
      bot.sendMessage(user, { image: { url: imageUrl } }, { quoted: quotedMessage });
    }
  } catch (error) {
    respond("Error occurred while retrieving the data:", error);
  }
});

// Send cosplay images
keith({
  nomCom: "cosplay",
  categorie: "Weeb",
  reaction: '😏'
}, async (user, bot, message) => {
  const { repondre: respond, ms: quotedMessage } = message;
  try {
    for (let i = 0; i < 5; i++) {
      const response = await axios.get('https://fantox-cosplay-api.onrender.com/', { responseType: "arraybuffer" });
      const imageBuffer = response.data;
      await writeFile("./cosplay.jpg", imageBuffer);
      bot.sendMessage(user, { image: { url: './cosplay.jpg' } }, { quoted: quotedMessage });
    }
  } catch (error) {
    respond("Error occurred while retrieving the data:", error);
  }
});

// Send couple pictures
keith({
  nomCom: "couplepp",
  categorie: 'Weeb',
  reaction: '💞'
}, async (user, bot, message) => {
  const { repondre: respond, ms: quotedMessage } = message;
  try {
    respond("she/he doesn't love you :)");
    const response = await axios.get('https://smiling-hosiery-bear.cyclic.app/weeb/couplepp');
    bot.sendMessage(user, { image: { url: response.data.male }, caption: "For Man" }, { quoted: quotedMessage });
    bot.sendMessage(user, { image: { url: response.data.female }, caption: "_For Woman_" }, { quoted: quotedMessage });
  } catch (error) {
    respond(error);
  }
});

const gameData = {
  nomCom: "tictac",
  categorie: "Games",
  reaction: '🎮'
};

keith(gameData, async (chatId, client, context) => {
  const {
    repondre, // Function to reply to messages
    ms, // Not used in the code
    auteurMessage, // Author of the message
    auteurMsgRepondu, // Author of the replied message
    msgRepondu, // The message that was replied to
    arg, // Argument (not used in this code)
    idBot // Bot ID (not used in this code)
  } = context;

  // If a message is replied to (indicating an invitation to play)
  if (msgRepondu) {
    // Send invitation message to the second player
    client.sendMessage(chatId, {
      text: '@' + auteurMessage.split('@')[0] + " invites @" + auteurMsgRepondu.split('@')[0] + " to play Tic-Tac-Toe. To accept the challenge, type 'yes'.",
      mentions: [auteurMessage, auteurMsgRepondu]
    });

    try {
      // Wait for a response from the second player
      const response = {
        sender: auteurMsgRepondu,
        chatJid: chatId,
        timeout: 30000 // 30 seconds timeout
      };
      const userResponse = await client.awaitForMessage(response);

      // If the second player accepts the challenge
      if (userResponse.message.conversation.toLowerCase() === "yes" || userResponse.message.extendedTextMessage.text.toLowerCase() === "yes") {
        let board = [['1', '2', '3'], ['4', '5', '6'], ['7', '8', '9']]; // Tic-Tac-Toe board
        let currentPlayer = auteurMessage; // Start with the first player
        let gameOver = false;

        // Game loop
        while (!gameOver) {
          // Display the current game board
          let boardDisplay = "Current board:\n" + board.map(row => row.join(" | ")).join("\n---|---|---\n") + "\n\n@" + currentPlayer.split('@')[0] + ", make your move (choose a number from the board).";
          client.sendMessage(chatId, {
            text: boardDisplay,
            mentions: [currentPlayer]
          });

          // Wait for the current player to make a move
          const moveResponse = {
            sender: currentPlayer,
            chatJid: chatId,
            timeout: 30000 // 30 seconds timeout
          };
          const moveMessage = await client.awaitForMessage(moveResponse);
          const playerMove = moveMessage.message.conversation;

          // Check if the move is valid (number within the board)
          const moveIndex = board.flat().indexOf(playerMove);
          if (moveIndex !== -1) {
            const row = Math.floor(moveIndex / 3);
            const col = moveIndex % 3;
            board[row][col] = currentPlayer === auteurMessage ? 'X' : 'O';

            // Check if the current player has won
            if (checkWin(board, currentPlayer === auteurMessage ? 'X' : 'O')) {
              client.sendMessage(chatId, {
                text: "Player @" + currentPlayer.split('@')[0] + " wins!",
                mentions: [auteurMessage, auteurMsgRepondu]
              });
              gameOver = true;
            } else {
              // Check for a draw (if the board is full)
              if (board.flat().every(cell => cell === 'X' || cell === 'O')) {
                client.sendMessage(chatId, {
                  text: "The game is a draw!",
                  mentions: [auteurMessage, auteurMsgRepondu]
                });
                gameOver = true;
              } else {
                // Switch player turn
                currentPlayer = currentPlayer === auteurMessage ? auteurMsgRepondu : auteurMessage;
              }
            }
          } else {
            // Invalid move: prompt player to choose a valid number
            client.sendMessage(chatId, {
              text: "Invalid move. Please choose a number from the board.",
              mentions: [currentPlayer]
            });
          }
        }
      } else {
        // If the second player refuses the invitation
        repondre("Invitation refused");
      }
    } catch (error) {
      if (error.message === "Timeout") {
        client.sendMessage(chatId, {
          text: '@' + auteurMsgRepondu.split('@')[0] + " took too long to respond. Game canceled.",
          mentions: [auteurMessage, auteurMsgRepondu]
        });
      } else {
        console.error(error);
      }
    }
  } else {
    // If no message is replied to, prompt the user to mention a friend
    repondre("Tic-Tac-Toe is a game for two players. Mention a friend to invite them.");
  }
});

// Check if the player has won (by checking all possible win conditions)
function checkWin(board, player) {
  const winPatterns = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6] // Diagonals
  ];

  // Check if any win pattern is fulfilled by the given player
  return winPatterns.some(pattern => 
    pattern.every(index => board[Math.floor(index / 3)][index % 3] === player)
  );
}

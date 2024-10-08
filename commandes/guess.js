const { zokou } = require("../framework/zokou");
const axios = require("axios");

zokou({
  'nomCom': "guessage",
  'reaction': '📓',
  'categorie': "Education-corner"
}, async (context, args, options) => {
  const { repondre: sendResponse, arg: commandArgs, ms: message } = options;
  const verseQuery = commandArgs.join(" ");
  
  if (!verseQuery) {
    return sendResponse("Please provide a name");
  }

  let response = await fetch(`https://api.agify.io/?name=${name}`);
  
  if (!response.ok) {
    return sendResponse("Please provide an element symbol or name");
  }

  let data = await response.json();
  let formattedMessage = `
    `*GuesAge Information:*\n
     • *Name:* ${data.name}\n
     • *Symbol:* ${data.count}\n
     • *Estimated Age:* ${data.age}\n`;

  await sendResponse(formattedMessage);
});

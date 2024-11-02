const { zokou } = require("../framework/zokou");
const s = require("../set");
const fs = require('fs');
const Heroku = require('heroku-client');

// Function to get a description of an environment variable
function getDescriptionFromEnv(varName) {
  const filePath = "./app.json";
  const fileContent = fs.readFileSync(filePath, 'utf-8');
  const config = JSON.parse(fileContent);
  return config.env[varName]?.description || "The environment variable description was not found.";
}

// Anti-call function setup
zokou({
  nomCom: 'anticall',
  categorie: "HEROKU"
}, async (chatId, zk, context) => {
  const { ms, repondre, superUser, auteurMessage, text } = context;

  // Check if the command is issued by the owner
  if (!superUser) {
    return repondre("*This command is restricted to the bot owner.* 💀");
  }

  // Prepare the response based on user input
  let responseMessage;
  if (text === 'on') {
    s.ANTICALL = 'yes';  // Enable Anti-Call
    responseMessage = "Anti-Call has been enabled.";
  } else if (text === 'off') {
    s.ANTICALL = 'no';  // Disable Anti-Call
    responseMessage = "Anti-Call has been disabled.";
  } else {
    responseMessage = "Usage:\n- `anticall on`: Enable Anti-Call\n- `anticall off`: Disable Anti-Call";
  }

  // Send response message
  try {
    await zk.sendMessage(chatId, { text: responseMessage }, { quoted: ms });
  } catch (error) {
    console.error("Error processing your request:", error);
    await zk.sendMessage(chatId, { text: 'Error processing your request.' }, { quoted: ms });
  }
});

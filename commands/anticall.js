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
  const { ms, repondre, superUser, auteurMessage, arg } = context;

  // Check if the command is issued by the owner
  if (!superUser) {
    return repondre("*This command is restricted to the bot owner.* 💀");
  }

  // Validate user input and respond accordingly
  if (!arg[0]) {
    return repondre('Instructions:\n\nType "anticall yes" to enable or "anticall no" to disable.');
  }

  const option = arg.join(' ').toLowerCase();
  switch (option) {
    case "yes":
      s.ANTICALL = 'yes';  // Enable Anti-Call
      responseMessage = 'Anti-call has been enabled.';
      break;

    case "no":
      s.ANTICALL = 'no';  // Disable Anti-Call
      responseMessage = 'Anti-call has been disabled.';
      break;

    default:
      return repondre("Please don't invent an option. Type 'anticall yes' or 'anticall no'.");
  }

  // Send the response message to the user
  try {
    await zk.sendMessage(chatId, { text: responseMessage }, { quoted: ms });
  } catch (error) {
    console.error("Error processing your request:", error);
    await zk.sendMessage(chatId, { text: 'Error processing your request.' }, { quoted: ms });
  }
});

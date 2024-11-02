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
  nomCom: 'presence',
  categorie: "HEROKU"
}, async (chatId, zk, context) => {
  const { ms, repondre, superUser, auteurMessage, arg } = context;

  // Check if the command is issued by the owner
  if (!superUser) {
    return repondre("*This command is restricted to the bot owner.* 💀");
  }

  // Validate user input and respond accordingly
  if (!arg[0]) {
    return repondre('Instructions:\n\nType "presence online" , "presence typing" , "presence recording" to enable. or "presence off" to disable.');
  }

  const option = arg.join(' ').toLowerCase();
  switch (option) {
    case "online":
      s.PRESENCE = '1';  // Enable always online
      responseMessage = 'always online has been enabled.';
      break;

    case "typing":
      s.PRESENCE = '2';  // enable autotyping
      responseMessage = 'Autotyping has been enabled.';
      break;

   case "recording":
      s.PRESENCE = '3';  // enable recording
      responseMessage = 'Autotyping has been enabled.';
      break;

case "off":
      s.PRESENCE = 'off';  // enable recording
      responseMessage = 'presence has been disabled.';
      break;

    default:
      return repondre("Please don't invent an option. Type 'presence online' , 'presence typing' or 'presence recording'.");
  }

  // Send the response message to the user
  try {
    await zk.sendMessage(chatId, { text: responseMessage }, { quoted: ms });
  } catch (error) {
    console.error("Error processing your request:", error);
    await zk.sendMessage(chatId, { text: 'Error processing your request.' }, { quoted: ms });
  }
});

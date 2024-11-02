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

  // Prepare the response based on user input
  let responseMessage;
  if (!arg[0]) { repondre('Instructions:\n\nType anticall yes or no'); return; }
const option = arg.join(' ')
switch (option) {
   case "yes" :
    s.ANTICALL = 'yes';  // Enable Anti-Call
    repondre ('anticall has been enabled')
    break;

 case "no":
    s.ANTICALL = 'no';  // Disable Anti-Call
    repondre ('anticall has been enabled')
    break;
default: repondre(please don't invent an option)
  // Send response message
  try {
    await zk.sendMessage(chatId, { arg: repondre }, { quoted: ms });
  } catch (error) {
    console.error("Error processing your request:", error);
    await zk.sendMessage(chatId, { arg: 'Error processing your request.' }, { quoted: ms });
  }
});

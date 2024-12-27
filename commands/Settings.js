


const { keith } = require("../keizzah/keith");
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
keith({
  nomCom: 'anticall',
  categorie: "HEROKU-CLIENT"
}, async (chatId, zk, context) => {
  const { ms, repondre, superUser, auteurMessage, arg } = context;

  // Check if the command is issued by the owner
  if (!superUser) {
    return repondre("*This command is restricted to the bot owner. or Alpha owner* 💀,,idiot");
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


keith({
  nomCom: 'areact',
  categorie: "HEROKU-CLIENT"
}, async (chatId, zk, context) => {
  const { ms, repondre, superUser, auteurMessage, arg } = context;

  // Check if the command is issued by the owner
  if (!superUser) {
    return repondre("*This command is restricted to the bot owner or Alpha owner.* 💀,,idiot");
  }

  // Validate user input and respond accordingly
  if (!arg[0]) {
    return repondre('Instructions:\n\nType "areact yes" to enable or "areact no" to disable.');
  }

  const option = arg.join(' ').toLowerCase();
  switch (option) {
    case "yes":
      s.AUTO_REACT = 'yes';  // Enable Areact
      responseMessage = 'Areact has been enabled.';
      break;

    case "no":
      s.AUTO_REACT = 'no';  // Disable Areact
      responseMessage = 'Autoreaction has been disabled.';
      break;

    default:
      return repondre("Please don't invent an option. Type 'areact yes' or 'areact no'.");
  }

  // Send the response message to the user
  try {
    await zk.sendMessage(chatId, { text: responseMessage }, { quoted: ms });
  } catch (error) {
    console.error("Error processing your request:", error);
    await zk.sendMessage(chatId, { text: 'Error processing your request.' }, { quoted: ms });
  }
});

keith({
  nomCom: 'readstatus',
  categorie: "HEROKU-CLIENT"
}, async (chatId, zk, context) => {
  const { ms, repondre, superUser, auteurMessage, arg } = context;

  // Check if the command is issued by the owner
  if (!superUser) {
    return repondre("*This command is restricted to the bot owner or Alpha owner.* 💀,,idiot");
  }

  // Validate user input and respond accordingly
  if (!arg[0]) {
    return repondre('Instructions:\n\nType "readstatus yes" to enable or "readstatus no" to disable.');
  }

  const option = arg.join(' ').toLowerCase();
  switch (option) {
    case "yes":
      s.AUTO_READ_STATUS = 'yes';  // Enable auroread status
      responseMessage = ' has been enabled successfully.';
      break;

    case "no":
      s.AUTO_READ_STATUS = 'no';  // Disable autoread status
      responseMessage = ' has been disabled successfully.';
      break;

    default:
      return repondre("Please don't invent an option. Type 'readstatus yes' or 'readstatus no'.");
  }

  // Send the response message to the user
  try {
    await zk.sendMessage(chatId, { text: responseMessage }, { quoted: ms });
  } catch (error) {
    console.error("Error processing your request:", error);
    await zk.sendMessage(chatId, { text: 'Error processing your request.' }, { quoted: ms });
  }
});
keith({
  nomCom: 'antidelete',
  categorie: "HEROKU-CLIENT"
}, async (chatId, zk, context) => {
  const { ms, repondre, superUser, auteurMessage, arg } = context;

  // Check if the command is issued by the owner
  if (!superUser) {
    return repondre("*This command is restricted to the bot owner or Alpha owner.* 💀,,idiot");
  }

  // Validate user input and respond accordingly
  if (!arg[0]) {
    return repondre('Instructions:\n\nType "antidelete yes" to enable or "antidelete no" to disable.');
  }

  const option = arg.join(' ').toLowerCase();
  switch (option) {
    case "yes":
      s.ADM = 'yes';  // Enable Antidelete
      responseMessage = ' has been enabled successfully.';
      break;

    case "no":
      s.ADM = 'no';  // Disable antidelete
      responseMessage = ' has been disabled successfully.';
      break;

    default:
      return repondre("Please don't invent an option. Type 'antidelete yes' or 'antidelete no'.");
  }

  // Send the response message to the user
  try {
    await zk.sendMessage(chatId, { text: responseMessage }, { quoted: ms });
  } catch (error) {
    console.error("Error processing your request:", error);
    await zk.sendMessage(chatId, { text: 'Error processing your request.' }, { quoted: ms });
  }
});

keith({
  nomCom: 'downloadstatus',
  categorie: "HEROKU-CLIENT"
}, async (chatId, zk, context) => {
  const { ms, repondre, superUser, auteurMessage, arg } = context;

  // Check if the command is issued by the owner
  if (!superUser) {
    return repondre("*This command is restricted to the bot owner or Alpha owner.* 💀,,idiot");
  }

  // Validate user input and respond accordingly
  if (!arg[0]) {
    return repondre('Instructions:\n\nType "downloadstatus yes" to enable or "downloadstatus no" to disable.');
  }

  const option = arg.join(' ').toLowerCase();
  switch (option) {
    case "yes":
      s.AUTO_DOWNLOAD_STATUS = 'yes';  // Enable Autodownloadstatus
      responseMessage = ' has been enabled successfully.';
      break;

    case "no":
      s.AUTO_DOWNLOAD_STATUS = 'no';  // Disable autodownload status
      responseMessage = ' has been disabled successfully.';
      break;

    default:
      return repondre("Please don't invent an option. Type 'downloadstatus yes' or 'downloadstatus no'.");
  }

  // Send the response message to the user
  try {
    await zk.sendMessage(chatId, { text: responseMessage }, { quoted: ms });
  } catch (error) {
    console.error("Error processing your request:", error);
    await zk.sendMessage(chatId, { text: 'Error processing your request.' }, { quoted: ms });
  }
});

keith({
  nomCom: 'startmessage',
  categorie: "HEROKU-CLIENT"
}, async (chatId, zk, context) => {
  const { ms, repondre, superUser, auteurMessage, arg } = context;

  // Check if the command is issued by the owner
  if (!superUser) {
    return repondre("*This command is restricted to the bot owner or Alpha owner.* 💀,,idiot");
  }

  // Validate user input and respond accordingly
  if (!arg[0]) {
    return repondre('Instructions:\n\nType "startmessage yes" to enable or "startmessage no" to disable.');
  }

  const option = arg.join(' ').toLowerCase();
  switch (option) {
    case "yes":
      s.DP = 'yes';  // Enable Autodownloadstatus
      responseMessage = ' has been enabled successfully.';
      break;

    case "no":
      s.DP = 'no';  // Disable startmessage
      responseMessage = ' has been disabled successfully.';
      break;

    default:
      return repondre("Please don't invent an option. Type 'startmessage yes' or 'startmessage no'.");
  }

  // Send the response message to the user
  try {
    await zk.sendMessage(chatId, { text: responseMessage }, { quoted: ms });
  } catch (error) {
    console.error("Error processing your request:", error);
    await zk.sendMessage(chatId, { text: 'Error processing your request.' }, { quoted: ms });
  }
});

keith({
  nomCom: 'readmessage',
  categorie: "HEROKU-CLIENT"
}, async (chatId, zk, context) => {
  const { ms, repondre, superUser, auteurMessage, arg } = context;

  // Check if the command is issued by the owner
  if (!superUser) {
    return repondre("*This command is restricted to the bot owner or Alpha owner.* 💀,,idiot");
  }

  // Validate user input and respond accordingly
  if (!arg[0]) {
    return repondre('Instructions:\n\nType "readmessage yes" to enable or "readmessage no" to disable.');
  }

  const option = arg.join(' ').toLowerCase();
  switch (option) {
    case "yes":
      s.AUTO_READ_MESSAGES = 'yes';  // Enable Autoread
      responseMessage = ' has been enabled successfully.';
      break;

    case "no":
      s.AUTO_READ_MESSAGES = 'no';  // Disable read message
      responseMessage = ' has been disabled successfully.';
      break;

    default:
      return repondre("Please don't invent an option. Type 'readmessage yes' or 'readmessage no'.");
  }

  // Send the response message to the user
  try {
    await zk.sendMessage(chatId, { text: responseMessage }, { quoted: ms });
  } catch (error) {
    console.error("Error processing your request:", error);
    await zk.sendMessage(chatId, { text: 'Error processing your request.' }, { quoted: ms });
  }
});

keith({
  nomCom: 'pm-permit',
  categorie: "HEROKU-CLIENT"
}, async (chatId, zk, context) => {
  const { ms, repondre, superUser, auteurMessage, arg } = context;

  // Check if the command is issued by the owner
  if (!superUser) {
    return repondre("*This command is restricted to the bot owner or Alpha owner.* 💀,,idiot");
  }

  // Validate user input and respond accordingly
  if (!arg[0]) {
    return repondre('Instructions:\n\nType "pm-permit yes" to enable or "pm-permit no" to disable.');
  }

  const option = arg.join(' ').toLowerCase();
  switch (option) {
    case "yes":
      s.PM_PERMIT = 'yes';  // Enable pm
      responseMessage = ' has been enabled successfully.';
      break;

    case "no":
      s.PM_PERMIT = 'no';  // Disable pm
      responseMessage = ' has been disabled successfully.';
      break;

    default:
      return repondre("Please don't invent an option. Type 'pm-permit yes' or 'pm-permit no'.");
  }

  // Send the response message to the user
  try {
    await zk.sendMessage(chatId, { text: responseMessage }, { quoted: ms });
  } catch (error) {
    console.error("Error processing your request:", error);
    await zk.sendMessage(chatId, { text: 'Error processing your request.' }, { quoted: ms });
  }
});
keith({
  nomCom: 'chatbot',
  categorie: "HEROKU-CLIENT"
}, async (chatId, zk, context) => {
  const { ms, repondre, superUser, auteurMessage, arg } = context;

  // Check if the command is issued by the owner
  if (!superUser) {
    return repondre("*This command is restricted to the bot owner or Alpha owner.* 💀,,idiot");
  }

  // Validate user input and respond accordingly
  if (!arg[0]) {
    return repondre('Instructions:\n\nType "chatbot yes" to enable or "chatbot no" to disable.');
  }

  const option = arg.join(' ').toLowerCase();
  switch (option) {
    case "yes":
      s.CHAT_BOT = 'yes';  // Enable pm
      responseMessage = ' has been enabled successfully.';
      break;

    case "no":
      s.CHAT_BOT = 'no';  // Disable pm
      responseMessage = ' has been disabled successfully.';
      break;

    default:
      return repondre("Please don't invent an option. Type 'chatbot yes' or 'chatbot no'.");
  }

  // Send the response message to the user
  try {
    await zk.sendMessage(chatId, { text: responseMessage }, { quoted: ms });
  } catch (error) {
    console.error("Error processing your request:", error);
    await zk.sendMessage(chatId, { text: 'Error processing your request.' }, { quoted: ms });
  }
});
keith({
  nomCom: 'greet',
  categorie: "HEROKU-CLIENT"
}, async (chatId, zk, context) => {
  const { ms, repondre, superUser, auteurMessage, arg } = context;

  // Check if the command is issued by the owner
  if (!superUser) {
    return repondre("*This command is restricted to the bot owner or Alpha owner.* 💀,,idiot");
  }

  // Validate user input and respond accordingly
  if (!arg[0]) {
    return repondre('Instructions:\n\nType "greet yes" to enable or "greet no" to disable.');
  }

  const option = arg.join(' ').toLowerCase();
  switch (option) {
    case "yes":
      s.AUTO_REPLY = 'yes';  // Enable pm
      responseMessage = ' has been enabled successfully.';
      break;

    case "no":
      s.AUTO_REPLY = 'no';  // Disable pm
      responseMessage = ' has been disabled successfully.';
      break;

    default:
      return repondre("Please don't invent an option. Type 'greet yes' or 'greet no'.");
  }

  // Send the response message to the user
  try {
    await zk.sendMessage(chatId, { text: responseMessage }, { quoted: ms });
  } catch (error) {
    console.error("Error processing your request:", error);
    await zk.sendMessage(chatId, { text: 'Error processing your request.' }, { quoted: ms });
  }
});

keith({
  nomCom: 'antivv',
  categorie: "HEROKU-CLIENT"
}, async (chatId, zk, context) => {
  const { ms, repondre, superUser, auteurMessage, arg } = context;

  // Check if the command is issued by the owner
  if (!superUser) {
    return repondre("*This command is restricted to the bot owner or Alpha owner.* 💀,,idiot");
  }

  // Validate user input and respond accordingly
  if (!arg[0]) {
    return repondre('Instructions:\n\nType "antivv yes" to enable or "antivv no" to disable.');
  }

  const option = arg.join(' ').toLowerCase();
  switch (option) {
    case "yes":
      s.ANTI_VV = 'yes';  // Enable pm
      responseMessage = ' has been enabled successfully.';
      break;

    case "no":
      s.ANTI_VV = 'no';  // Disable pm
      responseMessage = ' has been disabled successfully.';
      break;

    default:
      return repondre("Please don't invent an option. Type 'antivv yes' or 'antivv no'.");
  }

  // Send the response message to the user
  try {
    await zk.sendMessage(chatId, { text: responseMessage }, { quoted: ms });
  } catch (error) {
    console.error("Error processing your request:", error);
    await zk.sendMessage(chatId, { text: 'Error processing your request.' }, { quoted: ms });
  }
});

keith({
  nomCom: 'publicmode',
  categorie: "HEROKU-CLIENT"
}, async (chatId, zk, context) => {
  const { ms, repondre, superUser, auteurMessage, arg } = context;

  // Check if the command is issued by the owner
  if (!superUser) {
    return repondre("*This command is restricted to the bot owner or Alpha owner.* 💀,,idiot");
  }

  // Validate user input and respond accordingly
  if (!arg[0]) {
    return repondre('Instructions:\n\nType "publicmode yes" to enable or "publicmode no" to disable.');
  }

  const option = arg.join(' ').toLowerCase();
  switch (option) {
    case "yes":
      s.MODE = 'yes';  // Enable Autodownloadstatus
      responseMessage = ' has been enabled successfully.';
      break;

    case "no":
      s.MODE = 'no';  // Disable public
      responseMessage = ' has been disabled successfully.';
      break;

    default:
      return repondre("Please don't invent an option. Type 'publicmode yes' or 'publicmode no'.");
  }

  // Send the response message to the user
  try {
    await zk.sendMessage(chatId, { text: responseMessage }, { quoted: ms });
  } catch (error) {
    console.error("Error processing your request:", error);
    await zk.sendMessage(chatId, { text: 'Error processing your request.' }, { quoted: ms });
  }
});

keith({
  nomCom: 'autorecord',
  categorie: "HEROKU-CLIENT"
}, async (chatId, zk, context) => {
  const { ms, repondre, superUser, auteurMessage, arg } = context;

  // Check if the command is issued by the owner
  if (!superUser) {
    return repondre("*This command is restricted to the bot owner or Alpha owner.* 💀,,idiot");
  }

  // Validate user input and respond accordingly
  if (!arg[0]) {
    return repondre('Instructions:\n\nType "autorecord yes" to enable or "autorecord no" to disable.');
  }

  const option = arg.join(' ').toLowerCase();
  switch (option) {
    case "yes":
      s.ETAT = '3';  // Enable Autorecord
      responseMessage = ' has been enabled successfully.';
      break;

    case "no":
      s.ETAT = 'no';  // Disable Autorecord
      responseMessage = ' has been disabled successfully.';
      break;

    default:
      return repondre("Please don't invent an option. Type 'autorecord yes' or 'autorecord no'.");
  }

  // Send the response message to the user
  try {
    await zk.sendMessage(chatId, { text: responseMessage }, { quoted: ms });
  } catch (error) {
    console.error("Error processing your request:", error);
    await zk.sendMessage(chatId, { text: 'Error processing your request.' }, { quoted: ms });
  }
});

keith({
  nomCom: 'autotyping',
  categorie: "HEROKU-CLIENT"
}, async (chatId, zk, context) => {
  const { ms, repondre, superUser, auteurMessage, arg } = context;

  // Check if the command is issued by the owner
  if (!superUser) {
    return repondre("*This command is restricted to the bot owner or Alpha owner.* 💀,,idiot");
  }

  // Validate user input and respond accordingly
  if (!arg[0]) {
    return repondre('Instructions:\n\nType "autotyping yes" to enable or "autotyping no" to disable.');
  }

  const option = arg.join(' ').toLowerCase();
  switch (option) {
    case "yes":
      s.ETAT = '2';  // Enable Autorecord
      responseMessage = ' has been enabled successfully.';
      break;

    case "no":
      s.ETAT = 'no';  // Disable Autorecord
      responseMessage = ' has been disabled successfully.';
      break;

    default:
      return repondre("Please don't invent an option. Type 'autotyping yes' or 'autotyping no'.");
  }

  // Send the response message to the user
  try {
    await zk.sendMessage(chatId, { text: responseMessage }, { quoted: ms });
  } catch (error) {
    console.error("Error processing your request:", error);
    await zk.sendMessage(chatId, { text: 'Error processing your request.' }, { quoted: ms });
  }
});

keith({
  nomCom: 'alwaysonline',
  categorie: "HEROKU-CLIENT"
}, async (chatId, zk, context) => {
  const { ms, repondre, superUser, auteurMessage, arg } = context;

  // Check if the command is issued by the owner
  if (!superUser) {
    return repondre("*This command is restricted to the bot owner or Alpha owner.* 💀,,idiot");
  }

  // Validate user input and respond accordingly
  if (!arg[0]) {
    return repondre('Instructions:\n\nType "alwaysonline yes" to enable or "alwaysonline no" to disable.');
  }

  const option = arg.join(' ').toLowerCase();
  switch (option) {
    case "yes":
      s.ETAT = '1';  // Enable Autorecord
      responseMessage = ' has been enabled successfully.';
      break;

    case "no":
      s.ETAT = 'no';  // Disable Autorecord
      responseMessage = ' has been disabled successfully.';
      break;

    default:
      return repondre("Please don't invent an option. Type 'alwaysonline yes' or 'alwaysonline no'.");
  }

  // Send the response message to the user
  try {
    await zk.sendMessage(chatId, { text: responseMessage }, { quoted: ms });
  } catch (error) {
    console.error("Error processing your request:", error);
    await zk.sendMessage(chatId, { text: 'Error processing your request.' }, { quoted: ms });
  }
});

keith({
  nomCom: 'privatemode',
  categorie: "HEROKU-CLIENT"
}, async (chatId, zk, context) => {
  const { ms, repondre, superUser, auteurMessage, arg } = context;

  // Check if the command is issued by the owner
  if (!superUser) {
    return repondre("*This command is restricted to the bot owner or Alpha owner.* 💀,,idiot");
  }

  // Validate user input and respond accordingly
  if (!arg[0]) {
    return repondre('Instructions:\n\nType "privatemode yes" to enable or "privatemode no" to disable.');
  }

  const option = arg.join(' ').toLowerCase();
  switch (option) {
    case "yes":
      s.MODE = 'no';  // Enable Autodownloadstatus
      responseMessage = ' has been enabled successfully.';
      break;

    case "no":
      s.MODE = 'yes';  // Disable public
      responseMessage = ' has been disabled successfully.';
      break;

    default:
      return repondre("Please don't invent an option. Type 'privatemode yes' or 'privatemode no'.");
  }

  // Send the response message to the user
  try {
    await zk.sendMessage(chatId, { text: responseMessage }, { quoted: ms });
  } catch (error) {
    console.error("Error processing your request:", error);
    await zk.sendMessage(chatId, { text: 'Error processing your request.' }, { quoted: ms });
  }
});
keith({
  nomCom: 'autolikestatus',
  categorie: "HEROKU-CLIENT"
}, async (chatId, zk, context) => {
  const { ms, repondre, superUser, auteurMessage, arg } = context;

  // Check if the command is issued by the owner
  if (!superUser) {
    return repondre("*This command is restricted to the bot owner or Alpha owner.* 💀,,idiot");
  }

  // Validate user input and respond accordingly
  if (!arg[0]) {
    return repondre('Instructions:\n\nType "autolikestatus yes" to enable or "autolikestatus no" to disable.');
  }

  const option = arg.join(' ').toLowerCase();
  switch (option) {
    case "yes":
      s.AUTO_LIKE_STATUS = 'no';  // Enable Autodownloadstatus
      responseMessage = ' has been enabled successfully.';
      break;

    case "no":
      s.AUTO_LIKES_TATUS = 'yes';  // Disable public
      responseMessage = ' has been disabled successfully.';
      break;

    default:
      return repondre("Please don't invent an option. Type 'autolikestatus yes' or 'autolikestatus no'.");
  }

  // Send the response message to the user
  try {
    await zk.sendMessage(chatId, { text: responseMessage }, { quoted: ms });
  } catch (error) {
    console.error("Error processing your request:", error);
    await zk.sendMessage(chatId, { text: 'Error processing your request.' }, { quoted: ms });
  }
});
keith({
  nomCom: 'chatbot',
  categorie: "HEROKU-CLIENT"
}, async (chatId, zk, context) => {
  const { ms, repondre, superUser, auteurMessage, arg } = context;

  // Check if the command is issued by the owner
  if (!superUser) {
    return repondre("*This command is restricted to the bot owner or Alpha owner.* 💀,,idiot");
  }

  // Validate user input and respond accordingly
  if (!arg[0]) {
    return repondre('Instructions:\n\nType "chatbot yes" to enable or "chatbot no" to disable.');
  }

  const option = arg.join(' ').toLowerCase();
  switch (option) {
    case "yes":
      s.CHATBOT = 'no';  // Enable Autodownloadstatus
      responseMessage = ' has been enabled successfully.';
      break;

    case "no":
      s.CHATBOT = 'yes';  // Disable public
      responseMessage = ' has been disabled successfully.';
      break;

    default:
      return repondre("Please don't invent an option. Type 'chatbot yes' or 'chatbot no'.");
  }

  // Send the response message to the user
  try {
    await zk.sendMessage(chatId, { text: responseMessage }, { quoted: ms });
  } catch (error) {
    console.error("Error processing your request:", error);
    await zk.sendMessage(chatId, { text: 'Error processing your request.' }, { quoted: ms });
  }
});

keith({
  nomCom: 'settings',
  categorie: "HEROKU-CLIENT"
}, async (chatId, messagingService, context) => {
  const { ms, repondre, superUser, auteurMessage } = context;
  
  if (!superUser) {
    repondre("This command is for my owner only!");
    return;
  }

  const settingsOptions = [
    { nom: "ADM", choix: ['yes', "no"] },
    { nom: "ANTICALL", choix: ['yes', 'no'] },
    { nom: "AUTO_REACT", choix: ['yes', "no"] },
    { nom: "AUTO_VIEW_STATUS", choix: ['yes', "no"] },
    { nom: 'AUTO_SAVE_STATUS', choix: ['yes', "no"] },
    { nom: "PM_PERMIT", choix: ['yes', "no"] },
    { nom: 'MODE', choix: ["public", "private"] },
    { nom: "STARTING_MESSAGE", choix: ['on', "off"] },
    { nom: "AUTO_READ_MESSAGES", choix: ['on', "off"] },
    { nom: 'PRESENCE', choix: ["online", "typing", 'recording'] },
    { nom: "CHAT_BOT", choix: ['on', 'off'] }
  ];

  let settingsMenu = "╭──────༺♡༻──────╮\n  Alpha-Md Settings\n╰──────༺♡༻──────╯\n\n";
  settingsOptions.forEach((option, index) => {
    settingsMenu += `${index + 1}- *${option.nom}*\n`;
  });
  settingsMenu += "\n*Please choose a variable by its number*";

  const initialMessage = await messagingService.sendMessage(chatId, { text: settingsMenu }, { quoted: ms });
  console.log(initialMessage);

  // Await user choice for a setting
  const userChoice = await messagingService.awaitForMessage({
    chatJid: chatId,
    sender: auteurMessage,
    timeout: 60000,
    filter: msg => msg.message.extendedTextMessage?.contextInfo.stanzaId === initialMessage.key.id &&
                    msg.message.extendedTextMessage.text > 0 &&
                    msg.message.extendedTextMessage.text <= settingsOptions.length
  });

  const selectedOption = settingsOptions[userChoice.message.extendedTextMessage.text - 1];
  let settingsDetail = `╭──────༺♡༻──────╮\n  Alpha-Md settings\n╰──────༺♡༻──────╯\n\n`;
  settingsDetail += `*Variable Name* : ${selectedOption.nom}\n`;
  settingsDetail += `*Description* : ${getDescriptionFromEnv(selectedOption.nom)}\n\n`;
  settingsDetail += "┌────── ⋆⋅☆⋅⋆ ──────┐\n\n";
  selectedOption.choix.forEach((choice, index) => {
    settingsDetail += `* *${index + 1}* => ${choice}\n`;
  });
  settingsDetail += "\n└────── ⋆⋅☆⋅⋆ ──────┘\n\n*Now reply to this message with the number that matches your choice.*";

  const choiceMessage = await messagingService.sendMessage(chatId, { text: settingsDetail }, { quoted: userChoice });
  
  // Await user choice for the option
  const userOptionChoice = await messagingService.awaitForMessage({
    chatJid: chatId,
    sender: auteurMessage,
    timeout: 60000,
    filter: msg => msg.message.extendedTextMessage?.contextInfo.stanzaId === choiceMessage.key.id &&
                    msg.message.extendedTextMessage.text > 0 &&
                    msg.message.extendedTextMessage.text <= selectedOption.choix.length
  });

  const heroku = new Heroku({ token: s.HEROKU_API_KEY });
  await heroku.patch(`/apps/${s.HEROKU_APP_NAME}/config-vars`, {
    body: {
      [selectedOption.nom]: selectedOption.choix[userOptionChoice.message.extendedTextMessage.text - 1]
    }
  });

  repondre("That Heroku variable is changing, The bot is restarting....");
});

// Function to change Heroku environment variables
function changevars(commandName, varName) {
  keith({
    nomCom: commandName,
    categorie: 'HEROKU-CLIENT'
  }, async (chatId, messagingService, context) => {
    const { arg, superUser, repondre } = context;
    
    if (!superUser) {
      repondre("This command is for my owner only!");
      return;
    }

    if (!s.HEROKU_APP_NAME || !s.HEROKU_API_KEY) {
      repondre("Fill in the HEROKU_APP_NAME and HEROKU_API_KEY environment variables");
      return;
    }

    if (!arg[0]) {
      repondre(getDescriptionFromEnv(varName));
      return;
    }

    const heroku = new Heroku({ token: s.HEROKU_API_KEY });
    await heroku.patch(`/apps/${s.HEROKU_APP_NAME}/config-vars`, {
      body: {
        [varName]: arg.join(" ")
      }
    });

    repondre("That Heroku variable is changing, The bot is restarting....");
  });
}

changevars("setprefix", "PREFIXES");
changevars("menulinks", "BOT_MENU_LINKS");


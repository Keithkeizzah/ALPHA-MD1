const { keith } = require("../keizzah/keith");

keith({
  nomCom: 'restart',
  aliases: ['reboot'],
  categorie: "setting"
}, async (chatId, zk, context) => {
  const { repondre, superUser } = context;

  // Check if the user is a super user
  if (!superUser) {
    return repondre("You need owner privileges to execute this command!");
  }

  try {
    // Inform the user that the bot is restarting
    await repondre("*Restarting...*");

    // Function to create a delay
    const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

    // Wait for 3 seconds before restarting
    await sleep(3000);

    // Exit the process to restart the bot
    process.exit();
  } catch (error) {
    console.error("Error during restart:", error);
  }
});

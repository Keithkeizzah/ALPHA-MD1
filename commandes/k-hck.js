const { zokou } = require("../framework/zokou");
const conf = require("../set");

// Sleep function to delay execution
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

zokou({ nomCom: "hack", categorie: "fun", reaction: "💀", filename: __filename }, async (citel) => {
  const messages = [
    "Injecting Malware",
    " █ 10%",
    " █ █ 20%",
    " █ █ █ 30%",
    " █ █ █ █ 40%",
    " █ █ █ █ █ 50%",
    " █ █ █ █ █ █ 60%",
    " █ █ █ █ █ █ █ 70%",
    " █ █ █ █ █ █ █ █ 80%",
    " █ █ █ █ █ █ █ █ █ 90%",
    " █ █ █ █ █ █ █ █ █ █ 100%",
    "System hijacking on process..\nConnecting to Server error to find 404",
    "Device successfully connected...\nReceiving data...",
    "Data hijacked from device 100% completed\nKilling all evidence, killing all malwares...",
    "HACKING COMPLETED",
    "SENDING LOG DOCUMENTS...",
    "SUCCESSFULLY SENT DATA AND Connection disconnected",
    "BACKLOGS CLEARED",
    "POWERED BY ALPHA MD",
    "By keithkeizzah"
  ];

  let editedMessage;
  try {
    for (const message of messages) {
      if (!editedMessage) {
        // Send the initial message
        editedMessage = await citel.send(message);
        console.log(`Sent initial message: ${message}`);
      } else {
        // Edit the existing message
        await citel.edit(editedMessage, message);
        console.log(`Edited message to: ${message}`);
      }
      await sleep(1000); // Wait for 1 second
    }
  } catch (error) {
    console.error("An error occurred:", error);
  }
});

const { zokou } = require("../framework/zokou");
const fs = require("fs-extra");
const { Catbox } = require("node-catbox");
const catbox = new Catbox();

async function uploadToCatbox(filePath) {
  if (!fs.existsSync(filePath)) {
    throw new Error("File does not exist");
  }

  try {
    const response = await catbox.uploadFile({ path: filePath });
    if (response) {
      return response;
    } else {
      throw new Error("Error retrieving the file link");
    }
  } catch (error) {
    throw new Error(String(error));
  }
}

zokou({
  nomCom: 'catbox',
  categorie: "General",
  reaction: '👨🏿‍💻'
}, async (command, client, context) => {
  const { msgRepondu: repliedMsg, repondre: reply } = context;

  if (!repliedMsg) {
    reply("Please mention an image or video.");
    return;
  }

  let mediaPath;
  if (repliedMsg.videoMessage) {
    mediaPath = await client.downloadAndSaveMediaMessage(repliedMsg.videoMessage);
  } else if (repliedMsg.imageMessage) {
    mediaPath = await client.downloadAndSaveMediaMessage(repliedMsg.imageMessage);
  } else {
    reply("Please mention an image or video.");
    return;
  }

  try {
    const fileLink = await uploadToCatbox(mediaPath);
    fs.unlinkSync(mediaPath);
    reply(fileLink);
  } catch (error) {
    console.error("Error while creating your URL:", error);
    reply("Oops, an error occurred.");
  }
});

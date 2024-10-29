const { zokou } = require("../framework/zokou");
const axios = require("axios");

zokou({
  nomCom: "animevid",
  reaction: "🙌",
  categorie: "Cool-Videos"
}, async (chatId, message, context) => {
  const {
    repondre: reply,
    arg: args,
    ms: quotedMessage
  } = context;

  try {
   
    const response = await fetch("https://widipe.com/download/storyanime");
    const data = await response.json();

 await reply("A moment, *ALPHA-MD* is Downloading that...");


    const videoUrl = data.data.no_wm;

   
    await message.sendMessage(chatId, {
      video: { url: videoUrl },
      caption: "VIDEO DOWNLOADED BY *ALPHA-MD*",
      gifPlayback: false
    }, { quoted: quotedMessage });
  } catch (error) {
    console.error("Error downloading video:", error);
    reply("There was an error .");
  }
});

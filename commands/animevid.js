const { zokou } = require("../framework/zokou");
const axios = require("axios");

zokou({
  nomCom: "animevid",
  reaction: "🌟",
  categorie: "Cool-Videos"
}, async (chatId, message, context) => {
  const {
    repondre: reply,
    arg: args,
    ms: quotedMessage
  } = context;

  try {
    
    const response = await axios.get("https://widipe.com/download/storyanime");
    const data = response.data;

 
    await reply("A moment...");

    
    const videoUrl = data?.data?.no_wm;
    
    if (!videoUrl) {
     
      return reply("No video found. Please try again later." + error);
    }

  
    await message.sendMessage(chatId, {
      video: { url: videoUrl },
      caption: "powered by *ALPHA-MD*",
      gifPlayback: false
    }, { quoted: quotedMessage });
  } catch (error) {
    console.error("Error downloading video:", error);
    reply("There was an error downloading the video.");
  }
});

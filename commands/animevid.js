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
    // Fetch random anime video data from the API
    const response = await axios.get("https://widipe.com/download/storyanime");
    const data = response.data;

    // Notify user that download is in progress
    await reply("A moment, *ALPHA-MD* is Downloading that...");

    // Extract video URL (without watermark)
    const videoUrl = data?.data?.no_wm;
    
    if (!videoUrl) {
      // Handle missing video URL gracefully
      return reply("No video found. Please try again later.");
    }

    // Send the downloaded video with a caption
    await message.sendMessage(chatId, {
      video: { url: videoUrl },
      caption: "VIDEO DOWNLOADED BY *ALPHA-MD*",
      gifPlayback: false
    }, { quoted: quotedMessage });
  } catch (error) {
    console.error("Error downloading video:", error);
    reply("There was an error downloading the video.");
  }
});

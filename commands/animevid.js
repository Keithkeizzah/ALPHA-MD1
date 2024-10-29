const { zokou } = require("../framework/zokou");
const axios = require("axios");

zokou({
  nomCom: "animevid",
  reaction: "🙌",
  categorie: "Anime-Video"
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

    // Log the response to verify its structure
    console.log("API response data:", data);

    // Notify user that download is in progress
    await reply("A moment, *ALPHA-MD* is Downloading that...");

    // Extract the video URL; update the path if it's different in the response
    const videoUrl = data?.video_url || data?.data?.no_wm || data?.data?.url || null;

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

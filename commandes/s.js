const { zokou } = require("../framework/zokou");
const yts = require("yt-search");
const axios = require("axios");

zokou({
  nomCom: "playy",
  categorie: "Search",
  reaction: "💿"
}, async (origineMessage, zk, commandeOptions) => {
  const { arg, repondre } = commandeOptions;

  if (!arg[0]) {
    repondre("Which song do you want?");
    return;
  }

  try {
    const searchQuery = arg.join(" ");
    const results = await yts(searchQuery);
    const video = results.videos[0]; // Get the first video from the results

    if (video) {
      const songDetails = {
        image: { url: video.thumbnail },
        caption: `*ALPHA-MD SONG PLAYER*\nJoin for more tracks: https://t.me/keithmd\n╭───────────────◆\n│ *Title:* ${video.title}\n│ *Duration:* ${video.timestamp}\n│ *Yt link:* ${video.url}\n╰────────────────◆`
      };

      await zk.sendMessage(origineMessage, songDetails, { quoted: commandeOptions.ms });

      const response = await axios.get(`https://widipe.com/download/ytdl?url=${video.url}`);
      const data = response.data;

      if (data && data.result && data.result.mp3) {
        await zk.sendMessage(origineMessage, {
          document: { url: data.result.mp3 },
          mimetype: "audio/mp3",
          fileName: `${data.result.title}.mp3`
        }, { quoted: commandeOptions.ms });
      } else {
        repondre("Download failed: No valid data found.");
      }
    } else {
      repondre("No video found.");
    }
  } catch (error) {
    console.error("Error during search or download:", error);
    repondre("Download failed: " + error.message);
  }
});

const { zokou } = require("../framework/zokou");
const yts = require("yt-search");
const fs = require("fs");
const axios = require("axios");

const giftedapikey = 'gifteddevskk';
const BaseUrl = 'https://api-gifted-test-460bb726857c.herokuapp.com';

const downloadFile = async (url, filePath) => {
  try {
    const response = await axios.get(url, { responseType: "stream" });
    const fileStream = fs.createWriteStream(filePath);
    
    return new Promise((resolve, reject) => {
      response.data.pipe(fileStream);
      fileStream.on("finish", resolve);
      fileStream.on("error", (error) => {
        console.error("Error writing file:", error);
        reject(new Error("Download failed"));
      });
    });
  } catch (error) {
    console.error("Error during file download:", error);
    throw new Error("Download failed");
  }
};

const handleSearch = async (origineMessage, zk, commandeOptions, isVideo) => {
  const { arg, repondre } = commandeOptions;

  if (!arg.length) {
    repondre(isVideo ? "Insert video name" : "Which song do you want?");
    return;
  }

  const searchQuery = arg.join(" ");
  try {
    const results = await yts(searchQuery);
    const videos = results.videos;

    if (videos.length > 0) {
      const video = videos[0]; // Get the first video
      const videoUrl = video.url;
      const fileType = isVideo ? "video" : "audio";
      const filePath = isVideo ? "video.mp4" : "audio.mp3";

      const messageDetails = {
        image: { url: video.thumbnail },
        caption: `*ALPHA-MD ${isVideo ? "VIDEO" : "SONG"} PLAYER*\n` +
                 `╭───────────────◆\n` +
                 `│✞ *Title:* ${video.title}\n` +
                 `│✞ *Quality:* ${video.type}\n` +
                 `│✞ *Duration:* ${video.timestamp}\n` +
                 `│✞ *Viewers:* ${video.views}\n` +
                 `│✞ *Uploaded:* ${video.ago}\n` +
                 `│✞ *Artist:* ${video.author.name}\n` +
                 `╰────────────────◆\n` +
                 `⦿ *Direct YtLink:* ${video.url}\n` +
                 `╭────────────────◆\n` +
                 `Join us here for more downloads: https://t.me/keithmd \n` +
                 `Use prefix {/}, e.g., {/search dada}\n` +
                 `╰────────────────◆\n` +
                 `╭────────────────◆\n` +
                 `│ *_Powered by keithkeizzah._*\n` +
                 `╰─────────────────◆`
      };

      zk.sendMessage(origineMessage, messageDetails, { quoted: commandeOptions.ms });

      const downloadUrl = `${BaseUrl}/api/download/ytmp3?url=${encodeURIComponent(videoUrl)}&apikey=${giftedapikey}`;
      await downloadFile(downloadUrl, filePath);

      zk.sendMessage(origineMessage, {
        [fileType]: { url: filePath },
        caption: "*𝐆𝐄𝐍𝐄𝐑𝐀𝐓𝐄𝐃 𝐁𝐘 𝐀𝐋𝐏𝐇𝐀*",
        gifPlayback: false
      }, { quoted: commandeOptions.ms });

    } else {
      repondre("No video found.");
    }
  } catch (error) {
    console.error("Error during search or download:", error);
    repondre("An error occurred during the search or download.");
  }
};

zokou({
  nomCom: "play",
  categorie: "Search",
  reaction: "💿"
}, async (origineMessage, zk, commandeOptions) => {
  await handleSearch(origineMessage, zk, commandeOptions, false);
});

zokou({
  nomCom: "video",
  categorie: "Search",
  reaction: "🎥"
}, async (origineMessage, zk, commandeOptions) => {
  await handleSearch(origineMessage, zk, commandeOptions, true);
});

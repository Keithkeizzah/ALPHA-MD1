const { zokou } = require("../framework/zokou");
const yts = require("yt-search");
const fs = require("fs");
const axios = require("axios");
const giftedapikey = 'gifteddevskk';
const BaseUrl = 'https://api-gifted-test-460bb726857c.herokuapp.com';

const downloadFile = async (url, filePath, mimeType, originMessage, zk, commandeOptions) => {
  try {
    const response = await axios.get(url, { responseType: "stream" });
    const fileStream = fs.createWriteStream(filePath);
    response.data.pipe(fileStream);

    return new Promise((resolve, reject) => {
      fileStream.on("finish", () => {
        resolve();
      });
      fileStream.on("error", (error) => {
        console.error("Error writing file:", error);
        reject("Download failed");
      });
    });
  } catch (error) {
    console.error("Error during file download:", error);
    throw new Error("Download failed");
  }
};

const handleSearch = async (origineMessage, zk, commandeOptions, isVideo) => {
  const { arg, repondre } = commandeOptions;

  if (!arg[0]) {
    repondre(isVideo ? "Insert video name" : "Which song do you want?");
    return;
  }

  const searchQuery = arg.join(" ");
  try {
    const results = await yts(searchQuery);
    const videos = results.videos;

    if (videos.length > 0) {
      const video = videos[0];
      const fileType = isVideo ? "video" : "audio";
      const filePath = isVideo ? "video.mp4" : "audio.mp3";

      const messageDetails = {
        image: { url: video.thumbnail },
        caption: `*ALPHA-MD ${isVideo ? "VIDEO" : "SONG"} PLAYER*\n
╭───────────────◆
│✞ *Title:* ${video.title}
│✞ *Quality:* ${video.type}
│✞ *Duration:* ${video.timestamp}
│✞ *Viewers:* ${video.views}
│✞ *Uploaded:* ${video.ago}
│✞ *Artist:* ${video.author.name}
╰────────────────◆
⦿ *Direct YtLink:* ${video.url}
╭────────────────◆
Join us here for more downloads: https://t.me/keithmd 
Use prefix {/}, e.g., {/search dada}
╰────────────────◆
╭────────────────◆
│ *_Powered by keithkeizzah._*
╰─────────────────◆`
      };

      zk.sendMessage(origineMessage, messageDetails, { quoted: commandeOptions.ms });

      await downloadFile(`${BaseUrl}/api/download/ytmp3?url=${encodeURIComponent(videoUrl)}&apikey=${giftedapikey}`, filePath, `audio/mp4`, origineMessage, zk, commandeOptions);
      
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

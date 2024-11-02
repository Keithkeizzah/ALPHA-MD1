const { zokou } = require("../framework/zokou");
const yts = require("yt-search");

zokou({
  nomCom: "vid",
  categorie: "Search",
  reaction: '🎥'
}, async (chatId, client, messageData) => {
  const { ms, repondre, arg } = messageData;

  if (!arg[0]) {
    repondre("Please insert a song/video name.");
    return;
  }

  try {
    const searchQuery = arg.join(" ");
    const videoResults = await yts(searchQuery);

    if (videoResults && videoResults.videos.length > 0) {
      const videoUrl = videoResults.videos[0].url;
      const response = await fetch(`https://api.ibrahimadams.us.kg/api/download/ytmp4?url=${encodeURIComponent(videoUrl)}&apikey=cracker`);
      const jsonResponse = await response.json();

      if (jsonResponse.status === 200 && jsonResponse.success) {
        const downloadUrl = jsonResponse.result.download_url;

        const videoInfoMessage = {
          image: { url: videoResults.videos[0].thumbnail },
          caption: `*ALPHA-MD VIDEO PLAYER*\n
╭───────────────◆
│ *Duration:* ${videoResults.videos[0].timestamp}
│ *Artist:* ${videoResults.videos[0].author.name}
╰────────────────◆`
        };

        await client.sendMessage(chatId, { text: "*Downloading*" }, { quoted: ms });
        await client.sendMessage(chatId, videoInfoMessage, { quoted: ms });
        
        // Send video
        await client.sendMessage(chatId, { video: { url: downloadUrl }, mimetype: "video/mp4" }, { quoted: ms });

        // Send as document
        await client.sendMessage(chatId, { document: { url: downloadUrl }, mimetype: "video/mp4" }, { quoted: ms });
        
        repondre(`*${jsonResponse.result.title}*\n\n*Downloaded successfully. Keep using Alpha md*`);
      } else {
        repondre("Failed to download video. Please try again later.");
      }
    } else {
      repondre("No video found.");
    }
  } catch (error) {
    console.error("Error from API:", error);
    repondre("*Error*");
  }
});

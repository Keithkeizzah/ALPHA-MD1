const { zokou } = require("../framework/zokou");
const yts = require("yt-search");

zokou({
  nomCom: "testing",
  categorie: "Download",
  reaction: '🦄'
}, async (chatId, client, messageData) => {
  const { ms, repondre, arg } = messageData;

  if (!arg[0]) {
    repondre("Please insert a song name.");
    return;
  }

  try {
    const searchQuery = arg.join(" ");
    const audioResults = await yts(searchQuery);

    if (audioResults && audioResults.videos.length > 0) {
      const audioUrl = audioResults.videos[0].url;
      const response = await fetch(`https://api.ibrahimadams.us.kg/api/download/ytmp3?url=${encodeURIComponent(audioUrl)}&apikey=cracker`);
      const jsonResponse = await response.json();

      if (jsonResponse.status === 200 && jsonResponse.success) {
        const downloadUrl = jsonResponse.result.download_url;

        const messageData = {
          image: { url: audioResults.videos[0].thumbnail },
          caption: `*ALPHA SONG PLAYER*\n
╭───────────────◆
│ *Title:* ${jsonResponse.result.title}
│ *Duration:* ${audioResults.videos[0].timestamp}
│ *Viewers:* ${audioResults.videos[0].views}
│ *Uploaded:* ${audioResults.videos[0].ago}
│ *Artist:* ${audioResults.videos[0].author.name}
╰────────────────◆
╭────────────────◆
You can also join here to get your song download in more tracks 🤗😋 
https://t.me/keithmd 
Use prefix {/} example {/search dada}
╰────────────────◆`
        };

        await client.sendMessage(chatId, { text: "*Downloading wait*" }, { quoted: ms });
let downloadedLength = 0;
        await client.sendMessage(chatId, messageData, { quoted: ms });
        await client.sendMessage(chatId, { audio: { url: downloadUrl }, mimetype: "audio/mp4" }, { quoted: ms });
        repondre(`* ${jsonResponse.result.title}*\n\n*Downloaded successfully. Keep using Alpha md*`);
      } else {
        repondre("Failed to download audio. Please try again later.");
      }
    } else {
      repondre("No audio found.");
    }
  } catch (error) {
    console.error("Error from API:", error);
    repondre("An error occurred while searching or downloading the audio.");
  }
});



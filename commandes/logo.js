const { zokou } = require("../framework/zokou");
const yts = require("yt-search");

// Command to search and download videos
zokou({
  nomCom: "video",
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
      const response = await fetch("https://api.ibrahimadams.us.kg/api/download/ytmp4?url=" + encodeURIComponent(_0x4d538a) + "&apikey=" + "ibraah-tech");
      const jsonResponse = await response.json();

      if (jsonResponse.status === 200 && jsonResponse.success) {
        const downloadUrl = jsonResponse.result.download_url;

        const messageData = {
          image: { url: videoResults.videos[0].thumbnail },
          caption: `*ALPHA-MD VIDEO PLAYER*\n
╭───────────────◆
│ *Title:* ${jsonResponse.result.title}
│ *Duration:* ${videoResults.videos[0].timestamp}
│ *Viewers:* ${videoResults.videos[0].views}
│ *Uploaded:* ${videoResults.videos[0].ago}
│ *Artist:* ${videoResults.videos[0].author.name}
╰────────────────◆
╭────────────────◆
You can also join here to get your song download in more tracks 🤗😋 
https://t.me/keithmd 
Use prefix {/} example {/search dada}
╰────────────────◆`
        };

        await client.sendMessage(chatId, { text: "*𝘋𝘰𝘸𝘯𝘭𝘰𝘢𝘥𝘪𝘯𝘨...*" }, { quoted: ms });
let downloadedLength = 0;
        await client.sendMessage(chatId, messageData, { quoted: ms });
        await client.sendMessage(chatId, { video: { url: downloadUrl }, mimetype: "video/mp4" }, { quoted: ms });
        repondre("Keep using alpha md");
      } else {
        repondre("wait alpha is loading your file");
      }
    } else {
      repondre("No videos found.");
    }
  } catch (error) {
    console.error("Error from API:", error);
    repondre("Wait Alpha is getting your file");
  }
});

// Command to search and download audio
zokou({
  nomCom: "play",
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
      const response = await fetch("https://api.ibrahimadams.us.kg/api/download/ytmp4?url=" + encodeURIComponent(_0x4d538a) + "&apikey=" + "ibraah-tech");
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

        await client.sendMessage(chatId, { text: "*𝘋𝘰𝘸𝘯𝘭𝘰𝘢𝘥𝘪𝘯𝘨...*" }, { quoted: ms });
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

// Command to search and download songs
zokou({
  nomCom: "song",
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
    const songResults = await yts(searchQuery);

    if (songResults && songResults.videos.length > 0) {
      const songUrl = songResults.videos[0].url;
      const response = await fetch("https://api.ibrahimadams.us.kg/api/download/ytmp4?url=" + encodeURIComponent(_0x4d538a) + "&apikey=" + "ibraah-tech");
      const jsonResponse = await response.json();

      if (jsonResponse.status === 200 && jsonResponse.success) {
        const downloadUrl = jsonResponse.result.download_url;

        const messageData = {
          image: { url: songResults.videos[0].thumbnail },
          caption: `*ALPHA-MD SONG PLAYER*\n
╭───────────────◆
│ *Title:* ${jsonResponse.result.title}
│ *Duration:* ${songResults.videos[0].timestamp}
│ *Viewers:* ${songResults.videos[0].views}
│ *Uploaded:* ${songResults.videos[0].ago}
│ *Artist:* ${songResults.videos[0].author.name}
╰────────────────◆
╭────────────────◆
You can also join here to get your song download in more tracks 🤗😋 
https://t.me/keithmd 
Use prefix {/} example {/search dada}
╰────────────────◆`
        };

        await client.sendMessage(chatId, { text: "*𝘋𝘰𝘸𝘯𝘭𝘰𝘢𝘥𝘪𝘯𝘨...*" }, { quoted: ms });
let downloadedLength = 0;
        await client.sendMessage(chatId, messageData, { quoted: ms });
        await client.sendMessage(chatId, { audio: { url: downloadUrl }, mimetype: "audio/mp4" }, { quoted: ms });
        repondre(`* ${jsonResponse.result.title}*\n\n*Downloaded successfully. Keep using alpha bot*`);
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

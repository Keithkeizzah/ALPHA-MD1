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
      const response = await fetch(`https://api.giftedtech.us.kg/api/download/ytmp4v2?url=${encodeURIComponent(videoUrl)}&apikey=ibrahimadams`);
      const jsonResponse = await response.json();

      if (jsonResponse.status === 200 && jsonResponse.success) {
        const downloadUrl = jsonResponse.result.download_url;
        const messageData = {
          image: { url: videoResults.videos[0].thumbnail },
          caption: `Bmw is downloading ${jsonResponse.result.title} by ${videoResults.videos[0].author.name}\nTime: ${videoResults.videos[0].timestamp}\n\n\n> ©Ibrahim Adams`
        };

        await client.sendMessage(chatId, messageData, { quoted: ms });
        await client.sendMessage(chatId, { video: { url: downloadUrl }, mimetype: "video/mp4" }, { quoted: ms });
        repondre("Downloaded Successfully ✅");
      } else {
        repondre("Searching...⏳");
      }
    } else {
      repondre("No videos found.");
    }
  } catch (error) {
    console.error("Error from API:", error);
    repondre("Searching...⏳");
  }
});

// Command to search and download audio
zokou({
  nomCom: "play",
  categorie: "Download",
  reaction: '🎧'
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
      const response = await fetch(`https://api.giftedtech.us.kg/api/download/ytmp3v2?url=${encodeURIComponent(audioUrl)}&apikey=ibrahimadams`);
      const jsonResponse = await response.json();

      if (jsonResponse.status === 200 && jsonResponse.success) {
        const downloadUrl = jsonResponse.result.download_url;
        const messageData = {
          image: { url: audioResults.videos[0].thumbnail },
          caption: `*ALPHA SONG PLAYER*\n\n*◁ II ▷ 1:00 •* ${audioResults.videos[0].timestamp}\n\n*keith*`
        };

        await client.sendMessage(chatId, messageData, { quoted: ms });
        await client.sendMessage(chatId, { audio: { url: downloadUrl }, mimetype: "audio/mp4" }, { quoted: ms });
        repondre(`*Bmw Just Downloaded ${jsonResponse.result.title}*\n\n*®Adams 2024*`);
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
  reaction: '🎸'
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
      const response = await fetch(`https://api.giftedtech.us.kg/api/download/ytmp3v2?url=${encodeURIComponent(songUrl)}&apikey=ibrahimadams`);
      const jsonResponse = await response.json();

      if (jsonResponse.status === 200 && jsonResponse.success) {
        const downloadUrl = jsonResponse.result.download_url;
        const messageData = {
          image: { url: songResults.videos[0].thumbnail },
          caption: `*BMW SONG PLAYER*\n\n*◁ II ▷ 1:00 •* ${songResults.videos[0].timestamp}\n\n*©Ibrahim Adams*`
        };

        await client.sendMessage(chatId, messageData, { quoted: ms });
        await client.sendMessage(chatId, { audio: { url: downloadUrl }, mimetype: "audio/mp4" }, { quoted: ms });
        repondre(`*Bmw Just Downloaded ${jsonResponse.result.title}*\n\n*®Adams 2024*`);
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

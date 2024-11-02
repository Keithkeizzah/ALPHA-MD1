const { zokou } = require("../framework/zokou");
const yts = require('yt-search');
const fetch = require("node-fetch");

const BaseUrl = 'https://api.yanzbotz.live';
const apiKey = 'PrincelovesYanz';

zokou({
  nomCom: "testing",
  categorie: "Download",
  reaction: "💿"
}, async (dest, zk, commandeOptions) => {
  const { ms, repondre, arg } = commandeOptions;

  if (!arg[0]) {
    repondre("Please insert a song name.");
    return;
  }

  try {
    const songQuery = arg.join(" ");

    // Perform YouTube search
    const searchResults = await yts(songQuery);
    const videos = searchResults.videos;

    if (videos && videos.length > 0) {
      const video = videos[0];
      const videoUrl = video.url;

      // Call API to fetch audio download URL
      const apiResponse = await fetch(`${BaseUrl}/api/downloader/youtube?url=${encodeURIComponent(videoUrl)}&apikey=${apiKey}`);
      const apiResult = await apiResponse.json();

      if (apiResult.status === 200 && apiResult.success) {
        const audioDownloadUrl = apiResult.result.download_url;

        // Prepare the message with song details
        const songDetails = {
          image: { url: video.thumbnail },
          caption: `*ALPHA-MD SONG PLAYER*\n
╭───────────────◆
│ *Title:* ${video.title}
│ *Duration:* ${video.timestamp}
│ *Artist:* ${video.author.name}
│ *YtLink:* ${videoUrl}
╰────────────────◆
`
        };

        // Send song details
        await zk.sendMessage(dest, songDetails, { quoted: ms });

        // Send the audio as both audio and document format
        await zk.sendMessage(dest, {
          audio: { url: audioDownloadUrl },
          mimetype: 'audio/mp4'
        }, { quoted: ms });
        
        await zk.sendMessage(dest, {
          document: { url: audioDownloadUrl },
          mimetype: 'audio/mp4'
        }, { quoted: ms });

        repondre('*Alpha MD has just downloaded your song!*');
      } else {
        repondre('Failed to download audio. Please try again later.');
      }
    } else {
      repondre('No audio found.');
    }
  } catch (error) {
    console.error('Error from API:', error);
    repondre('An error occurred while searching or downloading the audio. ' + error.message);
  }
});

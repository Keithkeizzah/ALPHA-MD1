const { zokou } = require("../framework/zokou");
const yts = require('yt-search');
const axios = require("axios");
const BaseUrl = 'https://widipe.com';

zokou({
  nomCom: "sing",
  categorie: "Download",
  reaction: "💿"
}, async (dest, zk, commandeOptions) => {
  const { ms, repondre, arg } = commandeOptions;

  if (!arg[0]) {
    repondre("Please insert a song name.");
    return;
  }

  try {
    const topo = arg.join(" ");
    const search = await yts(topo);
    const videos = search.videos;

    if (videos && videos.length > 0) {
      const video = videos[0]; // Use the first video object
      const videoUrl = video.url;

      // Call the API endpoint to fetch the audio download URL
      const apiResponse = await axios.get(`${BaseUrl}/download/ytdl?url=${encodeURIComponent(videoUrl)}`);
      const apiResult = await apiResponse.json();

      if (apiResult.status === 200 && apiResult.success) {
        const audioDlUrl = apiResult.result.download_url;

        // Prepare the message with song details
        const infoMess = {
          image: { url: video.thumbnail },
          caption: `*ALPHA-MD SONG PLAYER*\n
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
You can also join here to get your song download in more tracks 🤗😋 
https://t.me/keithmd 
Use prefix {/} example {/search dada}
╰────────────────◆
╭────────────────◆
│ *_Powered by keithkeizzah._*
╰─────────────────◆`
        };

        // Send song details
        await zk.sendMessage(dest, infoMess, { quoted: ms });

        // Send the audio as a document
        await zk.sendMessage(dest, {
          document: { url: audioDlUrl },
          mimetype: 'audio/mp3'
        }, { quoted: ms });

        repondre('*Alpha md has just downloaded your song*...');
      } else {
        repondre('Failed to download audio. Please try again later.');
      }
    } else {
      repondre('No audio found.');
    }
  } catch (error) {
    console.error('Error from API:', error);
    repondre('An error occurred while searching or downloading the audio.');
  }
});

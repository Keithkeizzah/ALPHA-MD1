const { zokou } = require("../framework/zokou");
const yts = require('yt-search');
const BaseUrl = 'https://www.noobs-api.000.pe';

const fetchAudioOrVideo = async (arg, type, dest, zk, ms, repondre) => {
  if (!arg[0]) {
    repondre("Please insert a song/video name.");
    return;
  }

  try {
    const query = arg.join(" ");
    const search = await yts(query);
    const videos = search.videos;

    if (videos && videos.length > 0) {
      const video = videos[0];
      const videoUrl = video.url;

      // Call the API to fetch download URL
      const apiResponse = await fetch(`${BaseUrl}/dipto/alldl?url=${encodeURIComponent(videoUrl)}`);
      const apiResult = await apiResponse.json();

      if (apiResult.status === 200 && apiResult.success) {
        const downloadUrl = apiResult.result.download_url;
        const infoMessage = {
          image: { url: video.thumbnail },
          caption: `*ALPHA-MD ${type.toUpperCase()} PLAYER*\n
╭───────────────◆
│ *Title:* ${video.title}
│ *Quality:* ${type === 'song' ? 'mp3 (320kbps)' : '720p-HD'}
│ *Duration:* ${video.timestamp}
│ *Viewers:* ${video.views}
│ *Uploaded:* ${video.ago}
│ *Artist:* ${video.author.name}
╰────────────────◆
⦿ *Direct YtLink:* ${videoUrl}
╭────────────────◆
Join here for more tracks 🤗😋 
https://t.me/keithmd 
Use prefix {/}  example {/search dada}
╰────────────────◆
╭────────────────◆
│ *_Powered by keithkeizzah._*
╰─────────────────◆`
        };

        // Send video/audio details
        await zk.sendMessage(dest, infoMessage, { quoted: ms });

        // Send audio or video as a Buffer or Document based on type
        await zk.sendMessage(dest, {
          [type === 'song' ? 'audio' : 'document']: { url: downloadUrl },
          mimetype: 'audio/mp4' // Adjust if necessary
        }, { quoted: ms });

        repondre(`*Alpha md has just downloaded your ${type}*...`);
      } else {
        repondre('Failed to download audio/video. Please try again later.');
      }
    } else {
      repondre('No audio/video found.');
    }
  } catch (error) {
    console.error('Error from API:', error);
    repondre('An error occurred while searching or downloading.');
  }
};

zokou({
  nomCom: "play",
  categorie: "Download",
  reaction: "💿"
}, (dest, zk, commandeOptions) => {
  const { arg, ms, repondre } = commandeOptions;
  fetchAudioOrVideo(arg, 'song', dest, zk, ms, repondre);
});

zokou({
  nomCom: "song",
  categorie: "Download",
  reaction: "💿"
}, (dest, zk, commandeOptions) => {
  const { arg, ms, repondre } = commandeOptions;
  fetchAudioOrVideo(arg, 'song', dest, zk, ms, repondre);
});

zokou({
  nomCom: "video",
  categorie: "Download",
  reaction: "🎥"
}, (dest, zk, commandeOptions) => {
  const { arg, ms, repondre } = commandeOptions;
  fetchAudioOrVideo(arg, 'video', dest, zk, ms, repondre);
});

zokou({
  nomCom: "videodoc",
  categorie: "Download",
  reaction: "🎥"
}, (dest, zk, commandeOptions) => {
  const { arg, ms, repondre } = commandeOptions;
  fetchAudioOrVideo(arg, 'video', dest, zk, ms, repondre);
});

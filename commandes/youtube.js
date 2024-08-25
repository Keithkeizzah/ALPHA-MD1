const { zokou} = require("../famework/zokou");
const yts = require('yt-search');
// const fetch = require('node-fetch');
const BaseUrl = 'https://gifted-apis-third-30b2fdbb9819.herokuapp.com';
const giftedapikey = 'giftedtechk';

zokou({
  nomCom: "play",
  categorie: "Search",
  reaction: "💿"
}, async (dest, zk, commandeOptions) => {
  const { ms, repondre, arg } = commandeOptions;

  if (!arg[0]) {
    repondre("Please insert a song name.");
    return;
  }

  try {
    let topo = arg.join(" ");
    let videos = [];

    // Perform YouTube search
    const search = await yts(topo);
    videos = search.videos;

    if (videos && videos.length > 0) {
      const videoUrl = videos[0].url;

      // Call the API endpoint with the video URL to fetch audio download URL
      const apiResponse = await fetch(`${BaseUrl}/api/download/ytmp3?url=${encodeURIComponent(videoUrl)}&apikey=${giftedapikey}`);
      const apiResult = await apiResponse.json();

      if (apiResult.status === 200 && apiResult.success) {
        const audioUrl = apiResult.result.download_url;

        // Prepare the message with song details
        const infoMess = {
          image: { url: videos[0].thumbnail },
          caption: `*ALPHA-MD SONG PLAYER*\n
╭───────────────◆
│✞ *Title:* ${apiResult.result.title}
│✞ *Quality:* ${apiResult.result.type}
│✞ *Duration:* ${videos[0].timestamp}
│✞ *Viewers:* ${videos[0].views}
│✞ *Uploaded:* ${videos[0].ago}
│✞ *Artist:* ${videos[0].author.name}
╰────────────────◆
⦿ *Direct Link:* ${audioUrl}

╭────────────────◆
│ *_Powered by keithkeizzah._*
╰─────────────────◆`
        };

        // Send song details
        await zk.sendMessage(dest, infoMess, { quoted: ms });

        // Send the audio as a URL instead of buffer
        await zk.sendMessage(dest, {
          audio: { url: audioUrl },
          mimetype: 'audio/mp4'
        }, { quoted: ms });

        repondre('Download Success...');
      } else {
        repondre('Failed to download audio. Please try again later.');
      }
    } else {
      repondre('No videos found.');
    }
  } catch (error) {
    console.error('Error from API:', error);
    repondre('An error occurred while searching or downloading the video.');
  }
});

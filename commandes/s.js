const { zokou } = require("../framework/zokou");
const yts = require('yt-search');
const BaseUrl = 'https://api.giftedtech.my.id';
const giftedapikey = 'gifted';

zokou({
  nomCom: "playy",
  categorie: "Download",
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
        const audioDlUrl = apiResult.result.download_url;
        
        // Prepare the message with song details
        const infoMess = {
          image: { url: videos[0].thumbnail },
          caption: `*ALPHA-MD SONG PLAYER*\n
╭───────────────◆
│ *Title:* ${videos[0].title}
│ *Duration:* ${videos[0].timestamp}
│ *Artist:* ${videos[0].author.name}
│ *YtLink:* ${videoUrl}
╰────────────────◆
`
        };

        // Send song details
        await zk.sendMessage(dest, infoMess, { quoted: ms });

        // Send the audio as a Buffer instead of URL
        await zk.sendMessage(dest, {
          audio: { url: audioDlUrl },
          mimetype: 'audio/mp4'
        }, { quoted: ms });
        await zk.sendMessage(dest, {
          document: { url: audioDlUrl },
          mimetype: 'audio/mp4'
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
    repondre('An error occurred while searching or downloading the audio.' + error);
  }
});

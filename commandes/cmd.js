const { zokou } = require("../framework/zokou");
const yts = require('yt-search');
const axios = require('axios');

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
    const songName = arg.join(" ");
    
    // Perform YouTube search
    const search = await yts(songName);
    const videos = search.videos;

    if (videos && videos.length > 0) {
      const videoUrl = videos[0].url;

      // Call the API endpoint to fetch audio download URL
      const downloadInfoResponse = await axios.get(`https://ab.cococococ.com/ajax/download.php?copyright=0&format=mp3&url=${encodeURIComponent(videoUrl)}&api=dfcb6d76f2f6a9894gjkege8a4ab232222`);
      
      if (downloadInfoResponse.data.status === 200 && downloadInfoResponse.data.success) {
        const audioDlUrl = downloadInfoResponse.data.result.download_url;
        const title = downloadInfoResponse.data.info.title;
        const image = downloadInfoResponse.data.info.image;

        // Send song details
        const infoMess = `*ALPHA-MD SONG PLAYER*\nTitle: ${title}`;
        await zk.sendMessage(dest, infoMess, { quoted: ms });

        // Send the audio
        await zk.sendMessage(dest, {
          audio: { url: audioDlUrl },
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
    repondre('An error occurred while searching or downloading the audio.');
  }
});

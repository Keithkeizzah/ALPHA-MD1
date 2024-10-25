const { zokou } = require("../framework/zokou");
const yts = require('yt-search');
const axios = require("axios");
const BaseUrl = 'https://api.giftedtech.my.id';
const giftedapikey = 'gifted';

zokou({
  nomCom: "film",
  categorie: "Download",
  reaction: "🎥"
}, async (dest, zk, commandeOptions) => {
  const { ms, repondre, arg } = commandeOptions;

  if (!arg[0]) {
    repondre("Please insert a song/video name.");
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

      // Call the API endpoint with the video URL to fetch the video download URL
      const apiResponse = await fetch(`${BaseUrl}/api/download/ytmp4?url=${encodeURIComponent(videoUrl)}&apikey=${giftedapikey}`);
      const apiResult = await apiResponse.json();

      if (apiResult.status === 200 && apiResult.success) {
        const videoDlUrl = apiResult.result.download_url;

        // Prepare the message with video details
        const infoMess = {
          image: { url: videos[0].thumbnail },
          caption: `*ALPHA-MD VIDEO PLAYER*\n
╭───────────────◆
│ *Title:* ${videos[0].title}
│ *Duration:* ${videos[0].timestamp}
│ *YtLink:* ${videoUrl}
╰────────────────◆`
        };

        // Send video details
        await zk.sendMessage(dest, infoMess, { quoted: ms });

        // Send the video as a URL (direct download link)
        await zk.sendMessage(dest, {
          video: { url: videoDlUrl },
      caption: "*𝐆𝐄𝐍𝐄𝐑𝐀𝐓𝐄𝐃 𝐁𝐘 𝐀𝐋𝐏𝐇𝐀*",
          mimetype: 'video/mp4'
        }, { quoted: ms });
 await zk.sendMessage(dest, {
          document: { url: videoDlUrl },
               caption: "*𝐆𝐄𝐍𝐄𝐑𝐀𝐓𝐄𝐃 𝐁𝐘 𝐀𝐋𝐏𝐇𝐀*",
          mimetype: 'video/mp4'
        }, { quoted: ms });

        repondre('*Alpha Md has just downloaded your video*...');
      } else {
        repondre('Failed to download the video. Please try again later.');
      }
    } else {
      repondre('No videos found.');
    }
  } catch (error) {
    console.error('Error from API:', error);
    repondre('An error occurred while searching or downloading the video.' + error);
  }
});
zokou({
  nomCom: "video",
  categorie: "Search",
  reaction: "💿"
}, async (origineMessage, zk, commandeOptions) => {
  const { arg, repondre } = commandeOptions;

  if (!arg[0]) {
    repondre("Which song do you want?");
    return;
  }

  try {
    const searchQuery = arg.join(" ");
    const results = await yts(searchQuery);
    const video = results.videos[0]; // Get the first video from the results

    if (video && video.url) {
      const songDetails = {
        image: { url: video.thumbnail },
        caption: `*ALPHA-MD VIDEO PLAYER*\n\nJoin for more tracks of the song:\nhttps://t.me/keithmd\n╭───────────────◆\n│ *Title:* ${video.title}\n│ *Duration:* ${video.timestamp}\n│ *Yt link:* ${video.url}\n╰────────────────◆`
      };

      await zk.sendMessage(origineMessage, songDetails, { quoted: commandeOptions.ms });

      const response = await axios.get(`https://widipe.com/download/ytdl?url=${video.url}`);
      const data = response.data;

      if (data && data.result && data.result.mp4 && data.result.title) {
        const fileName = `${data.result.title}.mp4`;

        // Send as document
        await zk.sendMessage(origineMessage, {
          document: { url: data.result.mp4 },
          mimetype: "video/mp4",
          fileName: fileName
        }, { quoted: commandeOptions.ms });

        // Send as video
        await zk.sendMessage(origineMessage, {
          video: { url: data.result.mp4 },
          mimetype: "video/mp4",
          fileName: fileName
        }, { quoted: commandeOptions.ms });
      } else {
        repondre("Download failed: No valid data found.");
      }
    } else {
      repondre("No video found.");
    }
  } catch (error) {
    console.error("Error during search or download:", error);
    repondre("Download failed due to an error.");
  }
});
const { zokou } = require("../framework/zokou");
const yts = require("yt-search");
const axios = require("axios");

zokou({
  nomCom: "play",
  categorie: "Search",
  reaction: "💿"
}, async (origineMessage, zk, commandeOptions) => {
  const { arg, repondre } = commandeOptions;

  if (!arg[0]) {
    repondre("Which song do you want?");
    return;
  }

  try {
    const searchQuery = arg.join(" ");
    const results = await yts(searchQuery);
    const video = results.videos[0]; // Get the first video from the results

    if (video) {
      const songDetails = {
        image: { url: video.thumbnail },
        caption: `*ALPHA-MD SONG PLAYER*\nJoin for more tracks: https://t.me/keithmd\n╭───────────────◆\n│ *Title:* ${video.title}\n│ *Duration:* ${video.timestamp}\n│ *Yt link:* ${video.url}\n╰────────────────◆`
      };

      await zk.sendMessage(origineMessage, songDetails, { quoted: commandeOptions.ms });

      const response = await axios.get(`https://widipe.com/download/ytdl?url=${video.url}`);
      const data = response.data;

      if (data && data.result && data.result.mp3) {
        await zk.sendMessage(origineMessage, {
          document: { url: data.result.mp3 },
          mimetype: "audio/mp3",
          fileName: `${data.result.title}.mp3`
        }, { quoted: commandeOptions.ms });
      } else {
        repondre("Download failed: No valid data found.");
      }
    } else {
      repondre("No video found.");
    }
  } catch (error) {
    console.error("Error during search or download:", error);
    repondre("Download failed: " + error.message);
  }
});

zokou({
  nomCom: "song",
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


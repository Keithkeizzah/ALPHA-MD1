const { zokou } = require("../framework/zokou");
const yts = require('yt-search');
const BaseUrl = 'https://api.giftedtech.my.id';
const giftedapikey = 'gifted';

zokou({
  nomCom: "vida",
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
│* YtLink:* ${videoUrl}
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

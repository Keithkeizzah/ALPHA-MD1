const { zokou } = require("../framework/zokou");
const yts = require('yt-search');
const fetch = require('node-fetch');
const BaseUrl = 'https://api.giftedtech.my.id';
const giftedapikey = 'gifted';

const sendSongInfo = async (dest, zk, ms, video, audioDlUrl) => {
  const infoMess = {
    image: { url: video.thumbnail },
    caption: `*ALPHA-MD SONG PLAYER*\n
╭───────────────◆
│ *Title:* ${video.title}
│ *Quality:* mp3 (320kbps)
│ *Duration:* ${video.timestamp}
│ *Viewers:* ${video.views}
│ *Uploaded:* ${video.ago}
│ *Artist:* ${video.author.name}
╰────────────────◆
⦿ *Direct YtLink:* ${video.url}
╭────────────────◆
Join here to get more tracks: https://t.me/keithmd
Use prefix {/}  example {/search dada}
╰────────────────◆
╭────────────────◆
│ *_Powered by keithkeizzah._*
╰─────────────────◆`
  };

  await zk.sendMessage(dest, infoMess, { quoted: ms });
  await zk.sendMessage(dest, {
    audio: { url: audioDlUrl },
    mimetype: 'audio/mp4'
  }, { quoted: ms });
};

const handleDownload = async (dest, zk, commandeOptions, isVideo = false) => {
  const { ms, repondre, arg } = commandeOptions;

  if (!arg[0]) {
    repondre("Please insert a song/video name.");
    return;
  }

  try {
    const topo = arg.join(" ");
    const search = await yts(topo);
    const videos = search.videos;

    if (videos && videos.length > 0) {
      const video = videos[0];
      const videoUrl = video.url;
      const downloadType = isVideo ? 'mp4' : 'mp3';
      
      const apiResponse = await fetch(`${BaseUrl}/api/download/${downloadType}?url=${encodeURIComponent(videoUrl)}&apikey=${giftedapikey}`);
      const apiResult = await apiResponse.json();

      if (apiResult.status === 200 && apiResult.success) {
        const downloadUrl = apiResult.result.download_url;
        
        if (isVideo) {
          await zk.sendMessage(dest, {
            video: { url: downloadUrl },
            caption: "*𝐆𝐄𝐍𝐄𝐑𝐀𝐓𝐄𝐃 𝐁𝐘 𝐀𝐋𝐏𝐇𝐀*",
            mimetype: 'video/mp4'
          }, { quoted: ms });
        } else {
          await sendSongInfo(dest, zk, ms, video, downloadUrl);
        }

        repondre(`*Alpha md has just downloaded your ${isVideo ? 'video' : 'song'}*...`);
      } else {
        repondre(`Failed to download ${isVideo ? 'video' : 'audio'}. Please try again later.`);
      }
    } else {
      repondre('No audio/video found.');
    }
  } catch (error) {
    console.error('Error from API:', error);
    repondre(`An error occurred while searching or downloading: ${error.message}`);
  }
};

zokou({
  nomCom: "play",
  categorie: "Download",
  reaction: "💿"
}, (dest, zk, commandeOptions) => handleDownload(dest, zk, commandeOptions, false));

zokou({
  nomCom: "song",
  categorie: "Download",
  reaction: "💿"
}, (dest, zk, commandeOptions) => handleDownload(dest, zk, commandeOptions, false));

zokou({
  nomCom: "video",
  categorie: "Download",
  reaction: "🎥"
}, (dest, zk, commandeOptions) => handleDownload(dest, zk, commandeOptions, true));

zokou({
  nomCom: "videodoc",
  categorie: "Download",
  reaction: "🎥"
}, (dest, zk, commandeOptions) => handleDownload(dest, zk, commandeOptions, true));

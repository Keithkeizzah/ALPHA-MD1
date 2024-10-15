const { zokou } = require("../framework/zokou");
const yts = require('yt-search');
const { youtubedl, youtubedlv2 } = require("@bochilteam/scraper");

const sendMediaMessage = async (dest, zk, media, infoMess, ms) => {
  await zk.sendMessage(dest, infoMess, { quoted: ms });
  await zk.sendMessage(dest, media, { quoted: ms });
};

const handleMediaDownload = async (dest, zk, commandeOptions, isVideo = false) => {
  const { ms, repondre, arg } = commandeOptions;

  if (!arg[0]) {
    repondre("Please insert a song/video name.");
    return;
  }

  try {
    const query = arg.join(" ");
    const searchResults = await yts(query);
    const videos = searchResults.videos;

    if (videos && videos.length > 0) {
      const videoUrl = videos[0].url;
      const downloadInfo = await youtubedl(videoUrl).catch(async () => await youtubedlv2(videoUrl));

      if (downloadInfo) {
        const mediaUrl = isVideo ? downloadInfo.result.video_url : downloadInfo.result.download_url;
        const infoMess = {
          image: { url: videos[0].thumbnail },
          caption: `*ALPHA-MD ${isVideo ? "VIDEO" : "SONG"} PLAYER*\n
╭───────────────◆
│ *Title:* ${videos[0].title}
│ *Quality:* ${isVideo ? "720p-HD" : "mp3 (320kbps)"}
│ *Duration:* ${videos[0].timestamp}
│ *Viewers:* ${videos[0].views}
│ *Uploaded:* ${videos[0].ago}
│ *Artist:* ${videos[0].author.name}
╰────────────────◆
⦿ *Direct YtLink:* ${videoUrl}
╭────────────────◆
u can as well join here to get your song download
in more tracks 🤗😋 
https://t.me/keithmd 
use prefix {/} example {/search dada}
╰────────────────◆
╭────────────────◆
│ *_Powered by keithkeizzah._*
╰─────────────────◆`
        };

        const mediaMessage = isVideo ? {
          video: { url: mediaUrl },
          caption: "*𝐆𝐄𝐍𝐄𝐑𝐀𝐓𝐄𝐃 𝐁𝐘 𝐀𝐋𝐏𝐇𝐀*",
          mimetype: 'video/mp4'
        } : {
          audio: { url: mediaUrl },
          mimetype: 'audio/mp4'
        };

        await sendMediaMessage(dest, zk, mediaMessage, infoMess, ms);
        repondre(`*Alpha md has just downloaded your ${isVideo ? "video" : "song"}*...`);
      } else {
        repondre('Failed to download the media. Please try again later.');
      }
    } else {
      repondre('No media found.');
    }
  } catch (error) {
    console.error('Error from API:', error);
    repondre('An error occurred while searching or downloading the media.');
  }
};

zokou({
  nomCom: "play",
  categorie: "Download",
  reaction: "💿"
}, (dest, zk, commandeOptions) => handleMediaDownload(dest, zk, commandeOptions));

zokou({
  nomCom: "song",
  categorie: "Download",
  reaction: "💿"
}, (dest, zk, commandeOptions) => handleMediaDownload(dest, zk, commandeOptions));

zokou({
  nomCom: "video",
  categorie: "Download",
  reaction: "🎥"
}, (dest, zk, commandeOptions) => handleMediaDownload(dest, zk, commandeOptions, true));

zokou({
  nomCom: "videodoc",
  categorie: "Download",
  reaction: "🎥"
}, (dest, zk, commandeOptions) => handleMediaDownload(dest, zk, commandeOptions, true));

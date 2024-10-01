const { zokou } = require("../framework/zokou");
const yts = require('yt-search');
const axios = require("axios");
const BaseUrl = 'https://giftedapis.us.kg';
const giftedapikey = 'gifteddevskk';

const handleVideoSearch = async (dest, zk, commandeOptions, type) => {
  const { ms, repondre, arg } = commandeOptions;

  if (!arg[0]) {
    repondre("Please insert a song/video name.");
    return;
  }

  try {
    const searchTerm = arg.join(" ");
    const searchResult = await yts(searchTerm);
    const videos = searchResult.videos;

    if (videos && videos.length > 0) {
      const videoUrl = videos[0].url;
      const apiResponse = await fetch(`${BaseUrl}/api/download/ytmp4?url=${encodeURIComponent(videoUrl)}&apikey=${giftedapikey}`);
      const apiResult = await apiResponse.json();

      if (apiResult.status === 200 && apiResult.success) {
        const { title, type: quality, download_url: downloadUrl } = apiResult.result;

        const infoMess = {
          image: { url: videos[0].thumbnail },
          caption: `*ALPHA-MD ${type} PLAYER*\n` +
                   `╔══════════════════𝄡\n` +
                   `║ *Title:* ${title}\n` +
                   `║ *Quality:* ${quality}\n` +
                   `║ *Duration:* ${videos[0].timestamp}\n` +
                   `║ *Viewers:* ${videos[0].views}\n` +
                   `║ *Uploaded:* ${videos[0].ago}\n` +
                   `║ *Artist:* ${videos[0].author.name}\n` +
                   `╚═══════════════════𝄡\n` +
                   `𝄤 *Direct YtLink:* ${videoUrl}\n` +
                   `╔═══════════════════𝄡\n` +
                   `𝄠 *_Regards keithkeizzah._*\n` +
                   `╚═══════════════════𝄡`
        };

        await zk.sendMessage(dest, infoMess, { quoted: ms });

        const messageOptions = type === 'VIDEO' 
          ? { video: { url: downloadUrl }, mimetype: 'video/mp4' } 
          : { audio: { url: downloadUrl }, mimetype: 'audio/mp4' };

        await zk.sendMessage(dest, messageOptions, { quoted: ms });

        repondre(`Download successful for your ${type.toLowerCase()} using Alpha bot.`);
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

const commandHandler = (nomCom, type, reaction) => {
  zokou({
    nomCom,
    categorie: "Search",
    reaction
  }, async (dest, zk, commandeOptions) => {
    await handleVideoSearch(dest, zk, commandeOptions, type);
  });
};

commandHandler("play", 'SONG', "💿");
commandHandler("videodoc", 'VIDEO', "🎥");
commandHandler("video", 'VIDEO', "🎥");
commandHandler("song", 'SONG', "💿");

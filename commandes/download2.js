const { zokou } = require("../framework/zokou");
const yts = require('yt-search');
const fetch = require('node-fetch'); // Ensure fetch is imported
const BaseUrl = 'https://api-gifted-test-460bb726857c.herokuapp.com';
const giftedapikey = 'gifteddevskk';

const sendMediaMessage = async (dest, zk, mediaUrl, infoMess, ms) => {
  await zk.sendMessage(dest, infoMess, { quoted: ms });
  await zk.sendMessage(dest, mediaUrl, { quoted: ms });
};

const handleVideoSearch = async (dest, zk, commandeOptions, isAudio = false) => {
  const { ms, repondre, arg } = commandeOptions;

  if (!arg[0]) {
    repondre("Please insert a song/video name.");
    return;
  }

  try {
    const searchQuery = arg.join(" ");
    const search = await yts(searchQuery);
    const videos = search.videos;

    if (videos && videos.length > 0) {
      const videoUrl = videos[0].url;
      const downloadType = isAudio ? 'ytmp3' : 'ytmp4';
      const apiResponse = await fetch(`${BaseUrl}/api/download/${downloadType}?url=${encodeURIComponent(videoUrl)}&apikey=${giftedapikey}`);
      const apiResult = await apiResponse.json();

      if (apiResult.status === 200 && apiResult.success) {
        const mediaDlUrl = apiResult.result.download_url;

        const infoMess = {
          image: { url: videos[0].thumbnail },
          caption: `*ALPHA-MD ${isAudio ? 'SONG' : 'VIDEO'} PLAYER*\n
╭───────────────𝄡
│𝄟 *Title:* ${apiResult.result.title}
│𝄟 *Quality:* ${apiResult.result.type}
│𝄟 *Duration:* ${videos[0].timestamp}
│𝄟 *Viewers:* ${videos[0].views}
│𝄟 *Uploaded:* ${videos[0].ago}
│𝄟 *Artist:* ${videos[0].author.name}
╰────────────────𝄡
𝄤 *Direct YtLink:* ${videoUrl}

╭────────────────𝄡
│ *_Regards keithkeizzah._*
╰─────────────────𝄡`
        };

        const mediaMessage = isAudio 
          ? { audio: { url: mediaDlUrl }, mimetype: 'audio/mp4' }
          : { document: { url: mediaDlUrl }, mimetype: 'video/mp4' };

        await sendMediaMessage(dest, zk, mediaMessage, infoMess, ms);
        repondre(`${isAudio ? 'Audio' : 'Video'} download success...`);
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
  categorie: "Search",
  reaction: "💿"
}, (dest, zk, commandeOptions) => handleVideoSearch(dest, zk, commandeOptions, true));

zokou({
  nomCom: "videodoc",
  categorie: "Search",
  reaction: "🎥"
}, (dest, zk, commandeOptions) => handleVideoSearch(dest, zk, commandeOptions, false));

zokou({
  nomCom: "video",
  categorie: "Search",
  reaction: "🎥"
}, (dest, zk, commandeOptions) => handleVideoSearch(dest, zk, commandeOptions, false));

zokou({
  nomCom: "song",
  categorie: "Search",
  reaction: "🎥"
}, (dest, zk, commandeOptions) => handleVideoSearch(dest, zk, commandeOptions, true));

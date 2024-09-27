const { zokou } = require("../framework/zokou");
const yts = require('yt-search');
const fetch = require('node-fetch'); // Ensure fetch is imported
const BaseUrl = 'https://api-gifted-test-460bb726857c.herokuapp.com';
const giftedapikey = 'gifteddevskk';

const sendMedia = async (dest, zk, mediaInfo, mediaUrl, quotedMessage, mediaType) => {
  await zk.sendMessage(dest, mediaInfo, { quoted: quotedMessage });
  await zk.sendMessage(dest, mediaType === 'audio' ? { audio: { url: mediaUrl }, mimetype: 'audio/mp4' } : { document: { url: mediaUrl }, mimetype: 'video/mp4' }, { quoted: quotedMessage });
};

const handleMediaSearch = async (dest, zk, commandeOptions, mediaType) => {
  const { ms, repondre, arg } = commandeOptions;

  if (!arg[0]) {
    repondre("Please insert a song/video name.");
    return;
  }

  try {
    const topo = arg.join(" ");
    const searchResults = await yts(topo);
    const videos = searchResults.videos;

    if (videos.length > 0) {
      const videoUrl = videos[0].url;
      const downloadUrl = `${BaseUrl}/api/download/ytm${mediaType === 'audio' ? 'p3' : 'p4'}?url=${encodeURIComponent(videoUrl)}&apikey=${giftedapikey}`;
      const apiResponse = await fetch(downloadUrl);
      const apiResult = await apiResponse.json();

      if (apiResult.status === 200 && apiResult.success) {
        const mediaDlUrl = apiResult.result.download_url;
        const videoInfo = videos[0];

        const infoMess = {
          image: { url: videoInfo.thumbnail },
          caption: `*ALPHA-MD ${mediaType === 'audio' ? 'SONG' : 'VIDEO'} PLAYER*\n` +
                   `╭───────────────𝄡\n` +
                   `│𝄟 *Title:* ${apiResult.result.title}\n` +
                   `│𝄟 *Quality:* ${apiResult.result.type}\n` +
                   `│𝄟 *Duration:* ${videoInfo.timestamp}\n` +
                   `│𝄟 *Viewers:* ${videoInfo.views}\n` +
                   `│𝄟 *Uploaded:* ${videoInfo.ago}\n` +
                   `│𝄟 *Artist:* ${videoInfo.author.name}\n` +
                   `╰────────────────𝄡\n` +
                   `𝄤 *Direct YtLink:* ${videoUrl}\n\n` +
                   `╭────────────────𝄡\n` +
                   `│ *_Regards keithkeizzah._*\n` +
                   `╰─────────────────𝄡`
        };

        await sendMedia(dest, zk, infoMess, mediaDlUrl, ms, mediaType);
        repondre('Download Success...');
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

zokou({ nomCom: "play", categorie: "Search", reaction: "💿" }, (dest, zk, commandeOptions) => {
  handleMediaSearch(dest, zk, commandeOptions, 'audio');
});

zokou({ nomCom: "videodoc", categorie: "Search", reaction: "🎥" }, (dest, zk, commandeOptions) => {
  handleMediaSearch(dest, zk, commandeOptions, 'video');
});

zokou({ nomCom: "video", categorie: "Search", reaction: "🎥" }, (dest, zk, commandeOptions) => {
  handleMediaSearch(dest, zk, commandeOptions, 'video');
});

zokou({ nomCom: "song", categorie: "Search", reaction: "🎵" }, (dest, zk, commandeOptions) => {
  handleMediaSearch(dest, zk, commandeOptions, 'audio');
});

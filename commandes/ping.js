const { zokou } = require("../framework/zokou");
const yts = require('yt-search');
const fetch = require('node-fetch'); // Ensure this is imported
const BaseUrl = 'https://api.giftedtech.us.kg';
const apikey = 'ibrahimadams';

// Common function to handle song/video downloading
const downloadMedia = async (dest, zk, ms, arg, type) => {
  if (!arg[0]) {
    return zk.sendMessage(dest, "Please insert a song/video name.", { quoted: ms });
  }

  try {
    const searchTerm = arg.join(" ");
    const searchResults = await yts(searchTerm);
    const videos = searchResults.videos;

    if (videos.length > 0) {
      const videoUrl = videos[0].url;
      const apiEndpoint = type === 'audio' ? 'mp3v2' : 'mp4v2';
      const apiResponse = await fetch(`${BaseUrl}/api/download/${apiEndpoint}?url=${encodeURIComponent(videoUrl)}&apikey=${apikey}`);
      const apiResult = await apiResponse.json();

      if (apiResult.status === 200 && apiResult.success) {
        const downloadUrl = apiResult.result.download_url;
        const infoMess = {
          image: { url: videos[0].thumbnail },
          caption: `*ALPHA-MD ${type === 'audio' ? 'SONG' : 'VIDEO'} PLAYER*\n
╭───────────────◆
│ *Title:* ${videos[0].title}
│ *Quality:* ${type === 'audio' ? 'mp3 (320kbps)' : '720p-HD'}
│ *Duration:* ${videos[0].timestamp}
│ *Viewers:* ${videos[0].views}
│ *Uploaded:* ${videos[0].ago}
│ *Artist:* ${videos[0].author.name}
╰────────────────◆
⦿ *Direct YtLink:* ${videoUrl}`
        };

        // Send media details
        await zk.sendMessage(dest, infoMess, { quoted: ms });

        // Send the media
        const mediaMessage = type === 'audio' ? { audio: { url: downloadUrl }, mimetype: 'audio/mp4' } : { video: { url: downloadUrl }, caption: "*𝐆𝐄𝐍𝐄𝐑𝐀𝐓𝐄𝐃 𝐁𝐘 𝐀𝐋𝐏𝐇𝐀*", mimetype: 'video/mp4' };
        await zk.sendMessage(dest, mediaMessage, { quoted: ms });

        return zk.sendMessage(dest, `*Alpha md has just downloaded your ${type}*...`, { quoted: ms });
      } else {
        return zk.sendMessage(dest, 'Failed to download the media. Please try again later.', { quoted: ms });
      }
    } else {
      return zk.sendMessage(dest, 'No media found.', { quoted: ms });
    }
  } catch (error) {
    console.error('Error from API:', error);
    return zk.sendMessage(dest, 'An error occurred while searching or downloading the media.', { quoted: ms });
  }
};

// Command for downloading audio
zokou({
  nomCom: "play",
  categorie: "Download",
  reaction: "💿"
}, (dest, zk, commandeOptions) => {
  downloadMedia(dest, zk, commandeOptions.ms, commandeOptions.arg, 'audio');
});

// Command for downloading song
zokou({
  nomCom: "song",
  categorie: "Download",
  reaction: "💿"
}, (dest, zk, commandeOptions) => {
  downloadMedia(dest, zk, commandeOptions.ms, commandeOptions.arg, 'audio');
});

// Command for downloading video
zokou({
  nomCom: "video",
  categorie: "Download",
  reaction: "🎥"
}, (dest, zk, commandeOptions) => {
  downloadMedia(dest, zk, commandeOptions.ms, commandeOptions.arg, 'video');
});

// Command for downloading video as document
zokou({
  nomCom: "videodoc",
  categorie: "Download",
  reaction: "🎥"
}, (dest, zk, commandeOptions) => {
  downloadMedia(dest, zk, commandeOptions.ms, commandeOptions.arg, 'video');
});

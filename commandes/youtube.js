const { zokou } = require("../framework/zokou");
const yts = require('yt-search');
//const ytdl = require('ytdl-core');
const fs = require('fs');
const yt=require("../framework/dl/ytdl-core.js")
const ffmpeg = require("fluent-ffmpeg");
const yts1 = require("youtube-yts");
 zokou({
  nomCom: "play",
  categorie: "Search",
  reaction: "💿"
}, async (origineMessage, zk, commandeOptions) => {
  const { ms, repondre, arg } = commandeOptions;
     
  if (!arg[0]) {
    repondre("Hello _*${m.pushName}*_ , Please provide song name, eg *.play already dead by Juice wrld*.");
    return;
  }

  try {
    let topo = arg.join(" ");
    const search = await yts(topo);
    const videos = search.videos;

    if (videos && videos.length > 0 && videos[0]) {
      const urlElement = videos[0].url;
      const apiResponse = await fetch(`https://samirxpikachuio.onrender.com/ytmp3?url=${encodeURIComponent(urlElement)}`);
      const apiResult = await apiResponse.json();

      if (apiResult.status === 'success ✅') {
        const audioUrl = apiResult.data.download;
        const fileInfo = {
          title: apiResult.data.title,
          fileSize: apiResult.data.file_size,
          quality: apiResult.data.quality
        };

        let infoMess = {
          image: { url: videos[0].thumbnail },
          caption: `*ALPHA-MD SONG PLAYER*\n
╭───────────────◆
│᳆ *Title:* ${fileInfo.title}
│᳆ *File Size:* ${fileInfo.fileSize}
│᳆ *Quality:* ${fileInfo.quality}
│᳆ *Duration:* ${videos[0].timestamp}
│᳆ *Viewers:* ${videos[0].views}
│᳆ *Uploaded:* ${videos[0].ago}
│᳆ *Artist:* ${videos[0].author.name}
╰────────────────◆

╭────────────────◆
│ *_Powered by keithkeizzah._*
╰─────────────────◆`
        };

        zk.sendMessage(origineMessage, infoMess, { quoted: ms });

        // Send the audio file using the audio URL
        zk.sendMessage(origineMessage, { audio: { url: audioUrl }, mimetype: 'audio/mp4' }, { quoted: ms, ptt: false });
        console.log("Sending audio file completed!");

        await ms.React('✅');
        repondre('Download Success...');
      } else {
        repondre('Failed to download audio. Please try again later.');
      }
    } else {
      repondre('No videos found.');
    }
  } catch (error) {
    console.error('Error from Alpha-MD API:', error);
  }
});

zokou({
  nomCom: "video",
  categorie: "Search",
  reaction: "🎥"
}, async (origineMessage, zk, commandeOptions) => {
  const { arg, ms, repondre } = commandeOptions;

  if (!arg[0]) {
    repondre("Hello _*${m.pushName}*_ , Please provide song name, eg *.video already dead by Juice wrld*.");
    return;
  }

  const topo = arg.join(" ");
  try {
    const search = await yts(topo);
    const videos = search.videos;

    if (videos && videos.length > 0 && videos[0]) {
      const Element = videos[0];
      const apiResponse = await fetch(`https://samirxpikachuio.onrender.com/ytmp3?url=${encodeURIComponent(Element.url)}`);
      const apiResult = await apiResponse.json();

      if (apiResult.status === 'success ✅') {
        const videoUrl = apiResult.data.download;
        const fileInfo = {
          title: apiResult.data.title,
          fileSize: apiResult.data.file_size,
          quality: apiResult.data.quality
        };

        let InfoMess = {
          image: { url: videos[0].thumbnail },
          caption: `*ALPHA-MD VIDEO DOWNLOADER*\n
╭───────────────◆
│᳆ *Title:* ${fileInfo.title}
│᳆ *File Size:* ${fileInfo.fileSize}
│᳆ *Quality:* ${fileInfo.quality}
│᳆ *Duration:* ${Element.timestamp}
│᳆ *Viewers:* ${Element.views}
│᳆ *Uploaded:* ${Element.ago}
│᳆ *Author:* ${Element.author.name}
╰────────────────◆

╭───────────────◆
│ *_Powered by keithkeizzah._*
╰────────────────◆ `
        };

        zk.sendMessage(origineMessage, InfoMess, { quoted: ms });

        // Send the video file using the video URL
        zk.sendMessage(origineMessage, { video: { url: videoUrl }, mimetype: 'video/mp4' caption: "╭───────────────◆\n│ *ALPHA-MD DOWNLOADER*\n╰────────────────◆", gifPlayback: false }, { quoted: ms });
        console.log("Sending video file completed!");

        await ms.React('✅');
        repondre('Download Success...');
      } else {
        repondre('Failed to download video. Please try again later.');
      }
    } else {
      repondre('No video found.');
    }
  } catch (error) {
    console.error('Error from Alpha-MD API:', error);
  }
});

zokou({
  nomCom: "song",
categorie: "Search",
reaction: "💿"
}, async (origineMessage, zk, commandeOptions) => {
  const { ms, repondre, arg } = commandeOptions;

 if (!arg[0]) {
    return repondre("Hello _*${m.pushName}*_ , Please provide song name, eg *.song already dead by Juice wrld.*");
  }

  try {
    const topo = arg.join(" ");
    const search = await yts(topo);
    const videos = search.videos;

    if (!videos || videos.length <= 0) {
      return repondre(`No matching videos found for: *${topo}*!!`);
    }

    const urlYt = videos[0].url;
    const apiResponse = await fetch(`https://samirxpikachuio.onrender.com/ytmp3?url=${encodeURIComponent(urlYt)}`);
    const apiResult = await apiResponse.json();

    if (apiResult.status === 'success ✅') {
      const audioUrl = apiResult.data.download;
      const fileInfo = {
        title: apiResult.data.title,
        fileSize: apiResult.data.file_size,
        quality: apiResult.data.quality
      };

      const songDetails = `*ALPHA-MD SONG PLAYER*
╭───────────────◆
│᳆ *Title:* ${fileInfo.title}
│᳆ *File Size:* ${fileInfo.fileSize}
│᳆ *Quality:* ${fileInfo.quality}
│᳆ *Duration:* ${videos[0].timestamp}
│᳆ *Views:* ${videos[0].views}
│᳆ *Uploaded:* ${videos[0].ago}
│᳆ *Artist:* ${videos[0].author.name}
╰────────────────◆

╭───────────────◆
│ *_Powered by keithkeizzah._*
╰────────────────◆`;

      await zk.sendMessage(origineMessage, { text: songDetails }, { quoted: ms });

      // Send the audio file with the correct name and mimetype
      await zk.sendMessage(
        origineMessage, 
        { 
          document: { url: audioUrl }, 
          mimetype: 'audio/mpeg', 
          fileName: `${fileInfo.title}.mp3` 
        }, 
        { quoted: ms }
      );

      console.log("Sending audio file completed!");

      await ms.React('✅');
      repondre('Download Success...');
    } else {
      repondre('Failed to download audio. Please try again later.');
    }
  } catch (error) {
    console.error('Error:', error);
  }
});

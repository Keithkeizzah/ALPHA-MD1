const { zokou } = require("../framework/zokou");
const yts = require('yt-search');
const fs = require('fs');
const fetch = require('node-fetch');

const BaseUrl = 'https://api-gifted-test-460bb726857c.herokuapp.com';
const giftedapikey = 'giftedtechk';

zokou({
  nomCom: "song",
  categorie: "Search",
  reaction: "💿"
}, async (origineMessage, zk, commandeOptions) => {
  const { ms, repondre, arg } = commandeOptions;

  if (!arg[0]) {
    repondre("Hello _*${m.pushName}*_ , Please provide song name, eg *.play already dead by Juice WRLD*.");
    return;
  }

  try {
    const topo = arg.join(" ");
    const search = await yts(topo);
    const videos = search.videos;

    if (videos && videos.length > 0) {
      const videoUrl = videos[0].url;
      const apiResponse = await fetch(`${BaseUrl}/api/download/ytmp3?url=${encodeURIComponent(videoUrl)}&apikey=${giftedapikey}`);
      const apiResult = await apiResponse.json();

      if (apiResult.status === 200 && apiResult.success) {
        const audioUrl = apiResult.result.download_url;
        const infoMess = {
          image: { url: videos[0].thumbnail },
          caption: `*ALPHA-MD SONG PLAYER*\n
╭───────────────◆
│✞ *Title:* ${apiResult.result.title}
│✞ *Quality:* ${apiResult.result.type}
│✞ *Duration:* ${videos[0].timestamp}
│✞ *Viewers:* ${videos[0].views}
│✞ *Uploaded:* ${videos[0].ago}
│✞ *Artist:* ${videos[0].author.name}
╰────────────────◆
⦿ *Direct Link:* ${audioUrl}
╭────────────────◆
│ *_Powered by keithkeizzah._*
╰─────────────────◆`
        };

        await zk.sendMessage(origineMessage, infoMess, { quoted: ms });
        await zk.sendMessage(origineMessage, { audio: { url: audioUrl }, mimetype: 'audio/mp4' }, { quoted: ms });
        repondre('Download Success...');
      } else {
        repondre('Failed to download audio. Please try again later.');
      }
    } else {
      repondre('No videos found.');
    }
  } catch (error) {
    console.error('Error while searching or downloading the video:', error);
    repondre('An error occurred while searching or downloading the video.');
  }
});

zokou({
  nomCom: "video",
  categorie: "Search",
  reaction: "🎥"
}, async (origineMessage, zk, commandeOptions) => {
  const { arg, ms, repondre } = commandeOptions;

  if (!arg[0]) {
    repondre("Hello _*${m.pushName}*_ , Please provide song name, eg *.video already dead by Juice WRLD*.");
    return;
  }

  try {
    const topo = arg.join(" ");
    const search = await yts(topo);
    const videos = search.videos;

    if (videos && videos.length > 0) {
      const videoUrl = videos[0].url;
      const apiResponse = await fetch(`${BaseUrl}/api/download/ytmp4?url=${encodeURIComponent(videoUrl)}&apikey=${giftedapikey}`);
      const apiResult = await apiResponse.json();

      if (apiResult.status === 200 && apiResult.success) {
        const videoDownloadUrl = apiResult.result.download_url;
        const infoMess = {
          image: { url: videos[0].thumbnail },
          caption: `*ALPHA-MD VIDEO DOWNLOADER*\n
╭───────────────◆
│᳆ *Title:* ${apiResult.result.title}
│᳆ *Duration:* ${videos[0].timestamp}
│᳆ *Viewers:* ${videos[0].views}
│᳆ *Uploaded:* ${videos[0].ago}
│᳆ *Author:* ${videos[0].author.name}
╰────────────────◆`
        };

        await zk.sendMessage(origineMessage, infoMess, { quoted: ms });
        await zk.sendMessage(origineMessage, { video: { url: videoDownloadUrl }, caption: "╭───────────────◆\n│ *ALPHA-MD DOWNLOADER*\n╰────────────────◆" }, { quoted: ms });
        repondre('Download Success...');
      } else {
        repondre('Failed to download video. Please try again later.');
      }
    } else {
      repondre('No video found.');
    }
  } catch (error) {
    console.error('Error while searching or downloading the video:', error);
    repondre('An error occurred while searching or downloading the video.');
  }
});

zokou({
  nomCom: "mygroups",
  categorie: "User",
  reaction: "💿"
}, async (senn, zk, commandeOptions) => {
  const { ms, repondre } = commandeOptions;

  try {
    const getGroupzs = await zk.groupFetchAllParticipating();
    const groupzs = Object.entries(getGroupzs).map((entry) => entry[1]);
    const groupList = groupzs.map((v) => ({
      name: v.subject,
      id: v.id,
      members: v.participants.length,
    }));

    if (groupList.length === 0) {
      repondre("You are not part of any groups.");
      return;
    }

    let jackhuh = `*GROUPS YOU ARE IN*\n\n`;
    groupList.forEach(group => {
      jackhuh += `*GROUP NAME:* ${group.name}\n*MEMBERS:* ${group.members}\n*GROUP ID:* ${group.id}\n\n`;
    });

    repondre(jackhuh);
  } catch (error) {
    console.error('Error fetching groups:', error);
    repondre('An error occurred while fetching group details.');
  }
});

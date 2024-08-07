const { zokou } = require("../framework/zokou");
const acrcloud = require("acrcloud");
const yts = require('yt-search');
//const ytdl = require('ytdl-core');
const fs = require('fs');
const yt=require("../framework/dl/ytdl-core.js")
const ffmpeg = require("fluent-ffmpeg");
const yts1 = require("youtube-yts");
/*
zokou({
  nomCom: "play",
  categorie: "Search",
  reaction: "💿"
}, async (origineMessage, zk, commandeOptions) => {
  const { ms, repondre, arg } = commandeOptions;
     
  if (!arg[0]) {
    repondre("Please insert a song name.");
    return;
  }

  try {
    let topo = arg.join(" ")
    const search = await yts(topo);
    const videos = search.videos;

    if (videos && videos.length > 0 && videos[0]) {
      const urlElement = videos[0].url;
          
       let infoMess = {
          image: {url : videos[0]. thumbnail},
         caption : `*𝐀𝐋𝐏𝐇𝐀-𝐌𝐃 𝐒𝐎𝐍𝐆 𝐏𝐋𝐀𝐘𝐄𝐑*\n
╭───────────────◆
│⿻ *Title:* ${videos[0].title}
│⿻ *Duration:* ${videos[0].timestamp}
│⿻ *Viewers:* ${videos[0].views}
│⿻ *Uploaded:* ${videos[0].ago}
│⿻ *Artist:* ${videos[0].author.name}
╰────────────────◆
⦿ *Direct Link:* ${videos[0].url}

╭────────────────◆
│ *_Powered by keithkeizzah._*
╰─────────────────◆`
       }

      

      

      
       zk.sendMessage(origineMessage,infoMess,{quoted:ms}) ;
      // Obtenir le flux audio de la vidéo
      const audioStream = ytdl(urlElement, { filter: 'audioonly', quality: 'highestaudio' });

      // Nom du fichier local pour sauvegarder le fichier audio
      const filename = 'audio.mp3';

      // Écrire le flux audio dans un fichier local
      const fileStream = fs.createWriteStream(filename);
      audioStream.pipe(fileStream);

      fileStream.on('finish', () => {
        // Envoi du fichier audio en utilisant l'URL du fichier local
      

     zk.sendMessage(origineMessage, { audio: { url:"audio.mp3"},mimetype:'audio/mp4' }, { quoted: ms,ptt: false });
        console.log("Sending audio file completed !");

     
      });

      fileStream.on('error', (error) => {
        console.error('Error Occurred while writing audio file :', error);
        repondre('An error occurred while writing the audio file.');
      });
    } else {
      repondre('No videos found.');
    }
  } catch (error) {
    console.error('Error while searching or downloading video :', error);
    
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
    repondre("insert video name");
    return;
  }

  const topo = arg.join(" ");
  try {
    const search = await yts(topo);
    const videos = search.videos;

    if (videos && videos.length > 0 && videos[0]) {
      const Element = videos[0];

      let InfoMess = {
        image: { url: videos[0].thumbnail },
        caption: `*𝐀𝐋𝐏𝐇𝐀-𝐌𝐃 𝐕𝐈𝐃𝐄𝐎 𝐃𝐎𝐖𝐍𝐋𝐎𝐀𝐃𝐄𝐑*\n
╭───────────────◆
│⿻ *Title:* ${Element.title}
│⿻ *Duration:* ${Element.timestamp}
│⿻ *Viewers:* ${Element.views}
│⿻ *Uploaded:* ${Element.ago}
│⿻ *Author:* ${Element.author.name}
╰────────────────◆
⦿ *Direct Link:* ${Element.url}

╭───────────────◆
│ *_Powered by keithkeizzah._*
╰────────────────◆ `
      };

      zk.sendMessage(origineMessage, InfoMess, { quoted: ms });

      // Obtenir les informations de la vidéo à partir du lien YouTube
      const videoInfo = await ytdl.getInfo(Element.url);
      // Format vidéo avec la meilleure qualité disponible
      const format = ytdl.chooseFormat(videoInfo.formats, { quality: '18' });
      // Télécharger la vidéo
      const videoStream = ytdl.downloadFromInfo(videoInfo, { format });

      // Nom du fichier local pour sauvegarder la vidéo
      const filename = 'video.mp4';

      // Écrire le flux vidéo dans un fichier local
      const fileStream = fs.createWriteStream(filename);
      videoStream.pipe(fileStream);

      fileStream.on('finish', () => {
        // Envoi du fichier vidéo en utilisant l'URL du fichier local
        zk.sendMessage(origineMessage, { video: { url :"./video.mp4"} , caption:
          "╭───────────────◆\n│ *ALPHA-MD DOWNLOADER*\n╰────────────────◆", gifPlayback: false }, { quoted: ms });
      });


      fileStream.on('error', (error) => {
        console.error('Error while writing video file :', error);
        repondre('An error occurred while writing the video file.');
      });
    } else {
      repondre('No video found');
    }
  } catch (error) {
    console.error('Error searching or downloading video :', error);
    repondre('An error occurred while searching or downloading the video.');
  }
});
*/

zokou({
  nomCom: "mygroups",
  categorie: "User",
  reaction: "💿"
}, async (senn, zk, commandeOptions) => {
  const { ms, repondre, arg } = commandeOptions;
     
let getGroupzs = await zk.groupFetchAllParticipating();
            let groupzs = Object.entries(getGroupzs)
                .slice(0)
                .map((entry) => entry[1]);
            let anaa = groupzs.map((v) => v.id);
            let jackhuh = `*GROUPS AM IN*\n\n`
            repondre(`You are Currently in ${anaa.length} groups, Alpha MD will send that list in a moment. . .`)
            for (let i of anaa) {
                let metadat = await zk.groupMetadata(i);
               
                jackhuh += `*GROUP NAME:*- ${metadat.subject}\n`
                jackhuh += `*MEMBERS:*- ${metadat.participants.length}\n`
                jackhuh += `*GROUP ID:*- ${i}\n\n`

            }
          await repondre(jackhuh)

}
);

/*


zokou({
  nomCom: "song",
  categorie: "Search",
  reaction: "💿"
}, async (origineMessage, zk, commandeOptions) => {
  const { ms, repondre, arg } = commandeOptions;
     
  if (!arg[0]) {
    repondre("Insert a song name!");
    return;
  }

  try {
    let topo = arg.join(" ")
  
    const {
                videos
            } = await yts1(topo);
            if (!videos || videos.length <= 0) {
                repondre(`No Matching videos found for : *${args[0]}*!!`)
                return;
            }


let urlYt = videos[0].url
            let infoYt = await ytdl.getInfo(urlYt);


            const getRandonm = (ext) => {
                return `${Math.floor(Math.random() * 10000)}${ext}`;
            };

let titleYt = infoYt.videoDetails.title;
            let randomName = getRandonm(".mp3");
            const stream = ytdl(urlYt, {
                    filter: (info) => info.audioBitrate == 160 || info.audioBitrate == 128,
                })
                .pipe(fs.createWriteStream(`./${randomName}`));
            console.log("Audio downloading ->", urlYt);

            await new Promise((resolve, reject) => {
                stream.on("error", reject);
                stream.on("finish", resolve);
            });

            let stats = fs.statSync(`./${randomName}`);
            let fileSizeInBytes = stats.size;
           
            let fileSizeInMegabytes = fileSizeInBytes / (1024 * 1024);
            console.log("Audio downloaded ! \n Size: " + fileSizeInMegabytes);


await zk.sendMessage(
                    origineMessage, {
                        document: fs.readFileSync(`./${randomName}`),
                        mimetype: "audio/mpeg",
                        fileName: titleYt + ".mp3",
                    }, {
                        quoted: ms
                    }
                );

            fs.unlinkSync(`./${randomName}`);
        } catch (e) {
            repondre(e.toString())
        }

       
});



zokou({
  nomCom: "shazam",
  categorie: "Search",
  reaction: "👨🏿‍💻"
}, async (origineMessage, zk, commandeOptions) => {
  const { ms, msgRepondu, arg, repondre, nomAuteurMessage } = commandeOptions;

  if (!msgRepondu) {
    return repondre('Make sure to mention the media.');
  }

  // Define mime type (you may need to adjust this based on your setup)
  let mime = msgRepondu.mimetype || '';

  if (!/video|audio/.test(mime)) {
    return repondre("Tag a short video or audio for the bot to analyse.");
  }

  try {
    let acr = new acrcloud({
      host: 'identify-ap-southeast-1.acrcloud.com',
      access_key: '26afd4eec96b0f5e5ab16a7e6e05ab37',
      access_secret: 'wXOZIqdMNZmaHJP1YDWVyeQLg579uK2CfY6hWMN8'
    });

    let buffer = await msgRepondu.download();

    let { status, metadata } = await acr.identify(buffer);
    if (status.code !== 0) {
      return repondre(status.msg);
    }

    let { title, artists, album, genres, release_date } = metadata.music[0];
    let txt = `Title: ${title}${artists ? `\nArtists: ${artists.map(v => v.name).join(', ')}` : ''}`;
    txt += `${album ? `\nAlbum: ${album.name}` : ''}${genres ? `\nGenres: ${genres.map(v => v.name).join(', ')}` : ''}\n`;
    txt += `Release Date: ${release_date}`;
    repondre(txt.trim());

    const { videos } = await yts(txt.trim());
    if (!videos || videos.length <= 0) {
      return repondre("Song not found");
    }

    let urlYt = videos[0].url;
    let infoYt = await ytdl.getInfo(urlYt);
    let getRandomName = (ext) => `${Math.floor(Math.random() * 10000)}${ext}`;

    let titleYt = infoYt.videoDetails.title;
    let randomName = getRandomName(".mp3");
    const stream = ytdl(urlYt, {
      filter: (info) => info.audioBitrate == 160 || info.audioBitrate == 128,
    }).pipe(fs.createWriteStream(`./${randomName}`));

    await new Promise((resolve, reject) => {
      stream.on("error", reject);
      stream.on("finish", resolve);
    });

    await zk.sendMessage(
      origineMessage, {
        document: fs.readFileSync(`./${randomName}`),
        mimetype: "audio/mpeg",
        fileName: `${titleYt}.mp3`,
      }, {
        quoted: ms
      }
    );
  } catch (error) {
    console.error('Error processing the media:', error.message);
    repondre('An error occurred while processing the media.');
  }
});


zokou({
  nomCom: "song",
  categorie: "Search",
  reaction: "💿"
}, async (origineMessage, zk, commandeOptions) => {
  const { ms, repondre, arg } = commandeOptions;

  if (!arg[0]) {
    return repondre("Insert a song name!");
  }

  try {
    const topo = arg.join(" ");

    const { videos } = await yts1(topo);
    if (!videos || videos.length <= 0) {
      return repondre(`No matching videos found for: *${topo}*!!`);
    }

    const urlYt = videos[0].url;
    const infoYt = await ytdl.getInfo(urlYt);

    const getRandomName = (ext) => `${Math.floor(Math.random() * 10000)}${ext}`;

    const titleYt = infoYt.videoDetails.title;
    const views = infoYt.videoDetails.viewCount || 'Unknown Views';
    const duration = infoYt.videoDetails.lengthSeconds || 0; // Duration in seconds
    const artistYt = infoYt.videoDetails.author.name || 'Unknown Artist';
    const uploadYear = infoYt.videoDetails.uploadDate.split('-')[0] || 'Unknown Year';
    const directLink = urlYt;

    // Format duration as MM:SS
    const formattedDuration = `${Math.floor(duration / 60)}:${String(duration % 60).padStart(2, '0')}`;

    // Send song details first
    const songDetails = `*ALPHA-MD SONG PLAYER*
╭───────────────◆
│⿻ *Title:* ${titleYt}
│⿻ *Artist:* ${artistYt}
│⿻ *Views:* ${views}
│⿻ *Duration:* ${formattedDuration}
│⿻ *Year:* ${uploadYear}
╰────────────────◆
⦿ *Direct Link:* ${directLink}

╭───────────────◆
│ *_Powered by keithkeizzah._*
╰────────────────◆`;

    await zk.sendMessage(origineMessage, { text: songDetails }, { quoted: ms });

    const randomName = getRandomName(".mp3");
    const stream = ytdl(urlYt, {
      filter: (info) => info.audioBitrate === 160 || info.audioBitrate === 128,
    }).pipe(fs.createWriteStream(`./${randomName}`));

    console.log("Audio downloading ->", urlYt);

    await new Promise((resolve, reject) => {
      stream.on("error", reject);
      stream.on("finish", resolve);
    });

    const stats = fs.statSync(`./${randomName}`);
    const fileSizeInBytes = stats.size;
    const fileSizeInMegabytes = fileSizeInBytes / (1024 * 1024);
    console.log("Audio downloaded! \n Size: " + fileSizeInMegabytes.toFixed(2) + " MB");

    // Send the audio file
    await zk.sendMessage(
      origineMessage, {
        document: fs.readFileSync(`./${randomName}`),
        mimetype: "audio/mpeg",
        fileName: titleYt + ".mp3",
      }, {
        quoted: ms
      }
    );

    fs.unlinkSync(`./${randomName}`);
  } catch (e) {
    return repondre(`Error: ${e.toString()}`);
  }
});*/

zokou({
  nomCom: "play",
  categorie: "Search",
  reaction: "💿"
}, async (origineMessage, zk, commandeOptions) => {
  const { ms, repondre, arg } = commandeOptions;
     
  if (!arg[0]) {
    repondre("Please insert a song name.");
    return;
  }

  try {
    let topo = arg.join(" ");
    const search = await yts(topo);
    const videos = search.videos;

    if (videos && videos.length > 0 && videos[0]) {
      const urlElement = videos[0].url;
      const apiResponse = await fetch(`https://api.prabath-md.tech/api/ytmp3?url=${encodeURIComponent(urlElement)}`);
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
│⿻ *Title:* ${fileInfo.title}
│⿻ *File Size:* ${fileInfo.fileSize}
│⿻ *Quality:* ${fileInfo.quality}
│⿻ *Duration:* ${videos[0].timestamp}
│⿻ *Viewers:* ${videos[0].views}
│⿻ *Uploaded:* ${videos[0].ago}
│⿻ *Artist:* ${videos[0].author.name}
╰────────────────◆
⦿ *Direct Link:* ${audioUrl}

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
    repondre("Please insert a video name.");
    return;
  }

  const topo = arg.join(" ");
  try {
    const search = await yts(topo);
    const videos = search.videos;

    if (videos && videos.length > 0 && videos[0]) {
      const Element = videos[0];
      const apiResponse = await fetch(`https://api.prabath-md.tech/api/ytmp3?url=${encodeURIComponent(Element.url)}`);
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
│⿻ *Title:* ${fileInfo.title}
│⿻ *File Size:* ${fileInfo.fileSize}
│⿻ *Quality:* ${fileInfo.quality}
│⿻ *Duration:* ${Element.timestamp}
│⿻ *Viewers:* ${Element.views}
│⿻ *Uploaded:* ${Element.ago}
│⿻ *Author:* ${Element.author.name}
╰────────────────◆
⦿ *Direct Link:* ${videoUrl}

╭───────────────◆
│ *_Powered by keithkeizzah._*
╰────────────────◆ `
        };

        zk.sendMessage(origineMessage, InfoMess, { quoted: ms });

        // Send the video file using the video URL
        zk.sendMessage(origineMessage, { video: { url: videoUrl }, caption: "╭───────────────◆\n│ *ALPHA-MD DOWNLOADER*\n╰────────────────◆", gifPlayback: false }, { quoted: ms });
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
    repondre('An error occurred while searching or downloading the video.');
  }
});

zokou({
  nomCom: "song",
categorie: "Search",
reaction: "💿"
}, async (origineMessage, zk, commandeOptions) => {
  const { ms, repondre, arg } = commandeOptions;

 if (!arg[0]) {
    return repondre("Insert a song name!");
  }

  try {
    const topo = arg.join(" ");
    const search = await yts(topo);
    const videos = search.videos;

    if (!videos || videos.length <= 0) {
      return repondre(`No matching videos found for: *${topo}*!!`);
    }

    const urlYt = videos[0].url;
    const apiResponse = await fetch(`https://api.prabath-md.tech/api/ytmp3?url=${encodeURIComponent(urlYt)}`);
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
│⿻ *Title:* ${fileInfo.title}
│⿻ *File Size:* ${fileInfo.fileSize}
│⿻ *Quality:* ${fileInfo.quality}
│⿻ *Duration:* ${videos[0].timestamp}
│⿻ *Views:* ${videos[0].views}
│⿻ *Uploaded:* ${videos[0].ago}
│⿻ *Artist:* ${videos[0].author.name}
╰────────────────◆
⦿ *Direct Link:* ${audioUrl}

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
    repondre('An error occurred while searching or downloading the video.');
  }
});

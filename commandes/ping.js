const { zokou } = require("../framework/zokou");
const yts = require('yt-search');
const fetch = require('node-fetch'); // Make sure to install node-fetch
const BaseUrl = 'https://api.giftedtech.us.kg';
const apikey = 'ibrahimadams';

async function sendMedia(dest, zk, ms, video, audioDlUrl, type) {
    const infoMess = {
        image: { url: video.thumbnail },
        caption: `*ALPHA-MD ${type.toUpperCase()} PLAYER*\n
╭───────────────◆
│ *Title:* ${video.title}
│ *Quality:* ${type === 'video' ? '720p-HD' : 'mp3 (320kbps)'}
│ *Duration:* ${video.timestamp}
│ *Viewers:* ${video.views}
│ *Uploaded:* ${video.ago}
│ *Artist:* ${video.author.name}
╰────────────────◆
 *Direct YtLink:* ${video.url}`
    };

    await zk.sendMessage(dest, infoMess, { quoted: ms });

    if (type === 'audio') {
        await zk.sendMessage(dest, {
            audio: { url: audioDlUrl },
            mimetype: 'audio/mp4'
        }, { quoted: ms });
    } else if (type === 'video') {
        await zk.sendMessage(dest, {
            video: { url: audioDlUrl },
            caption: "*𝐆𝐄𝐍𝐄𝐑𝐀𝐓𝐄𝐃 𝐁𝐘 𝐀𝐋𝐏𝐇𝐀*",
            mimetype: 'video/mp4'
        }, { quoted: ms });
    }
}

async function handleDownload(dest, zk, commandeOptions, type) {
    const { ms, repondre, arg } = commandeOptions;

    if (!arg[0]) {
        repondre("Please insert a song/video name.");
        return;
    }

    try {
        let topo = arg.join(" ");
        const search = await yts(topo);
        const videos = search.videos;

        if (videos && videos.length > 0) {
            const video = videos[0];
            const videoUrl = video.url;

            const apiResponse = await fetch(`${BaseUrl}/api/download/yt${type === 'video' ? 'mp4v2' : 'mp3v2'}?url=${encodeURIComponent(videoUrl)}&apikey=${apikey}`);
            const apiResult = await apiResponse.json();

            if (apiResult.status === 200 && apiResult.success) {
                const downloadUrl = apiResult.result.download_url;

                await sendMedia(dest, zk, ms, video, downloadUrl, type);

                repondre('*You can also join here to get your song download in more tracks 🤗😋 \nhttps://t.me/keithmd \nUse prefix {/} example {/search dada}*...');
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
}

zokou({ nomCom: "play", categorie: "Download", reaction: "💿" }, async (dest, zk, commandeOptions) => {
    await handleDownload(dest, zk, commandeOptions, 'audio');
});

zokou({ nomCom: "song", categorie: "Download", reaction: "💿" }, async (dest, zk, commandeOptions) => {
    await handleDownload(dest, zk, commandeOptions, 'audio');
});

zokou({ nomCom: "video", categorie: "Download", reaction: "🎥" }, async (dest, zk, commandeOptions) => {
    await handleDownload(dest, zk, commandeOptions, 'video');
});

zokou({ nomCom: "videodoc", categorie: "Download", reaction: "🎥" }, async (dest, zk, commandeOptions) => {
    await handleDownload(dest, zk, commandeOptions, 'video');
});

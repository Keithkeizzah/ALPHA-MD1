const { zokou } = require("../framework/zokou");
const yts = require("yt-search");

const apiKey = "giftedtechk";
const apiUrl = "https://temp.giftedapis.us.kg/api/download/";

async function downloadMedia(type, _0x175235, _0x5d14bf, _0x1378ad) {
    const { ms, repondre, arg } = _0x1378ad;
    if (!arg[0]) {
        repondre("Please insert a song/video name.");
        return;
    }

    const query = arg.join(" ");
    try {
        const searchResults = await yts(query);
        const videos = searchResults.videos;

        if (videos && videos.length > 0) {
            const videoUrl = videos[0].url;
            const response = await fetch(`${apiUrl}ytmp${type === 'video' ? '4v2' : '3v2'}?url=${encodeURIComponent(videoUrl)}&apikey=${apiKey}`);
            const result = await response.json();

            if (result.status === 200 && result.success) {
                const downloadUrl = result.result.download_url;
                const mediaData = {
                    image: { url: videos[0].thumbnail },
                    caption: `*ALPHA-MD ${type.toUpperCase()} PLAYER*\n\n` +
                             `╭───────────────◆\n` +
                             `│⿻ *Title:* ${result.result.title}\n` +
                             `│⿻ *Quality:* ${result.result.type}\n` +
                             `│⿻ *Duration:* ${videos[0].timestamp}\n` +
                             `│⿻ *Viewers:* ${videos[0].views}\n` +
                             `│⿻ *Uploaded:* ${videos[0].ago}\n` +
                             `│⿻ *Artist:* ${videos[0].author.name}\n` +
                             `╰────────────────◆\n` +
                             `⦿ *Direct YtLink:* ${videoUrl}\n\n` +
                             `╭────────────────◆\n` +
                             `│ *_Powered by Keith Tech._*\n` +
                             `╰─────────────────◆`
                };

                await _0x5d14bf.sendMessage(_0x175235, mediaData, { quoted: ms });
                await _0x5d14bf.sendMessage(_0x175235, {
                    [type]: { url: downloadUrl },
                    mimetype: type === 'video' ? "video/mp4" : "audio/mp4"
                }, { quoted: ms });
            } else {
                repondre("Failed to download the media. Please try again later.");
            }
        } else {
            repondre("No media found.");
        }
    } catch (error) {
        console.error("Error from API:", error);
        repondre("An error occurred while searching or downloading the media.");
    }
}

zokou({ nomCom: "play", categorie: "Download", reaction: '💿' }, (msg, client, data) => downloadMedia('audio', msg, client, data));
zokou({ nomCom: "song", categorie: "Download", reaction: '💿' }, (msg, client, data) => downloadMedia('audio', msg, client, data));
zokou({ nomCom: "video", categorie: "Download", reaction: '🎥' }, (msg, client, data) => downloadMedia('video', msg, client, data));
zokou({ nomCom: "videodoc", categorie: "Download", reaction: '🎥' }, (msg, client, data) => downloadMedia('video', msg, client, data));

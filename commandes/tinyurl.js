const { zokou } = require("../framework/zokou");
const axios = require('axios');

zokou({ nomCom: "tinyurl", categorie: "General", reaction: "👨🏿‍💻" }, async (origineMessage, zk, commandeOptions) => {
    const { msgRepondu, repondre } = commandeOptions;

    if (!msgRepondu) {
        repondre('Mention an image or video or a URL to shorten.');
        return;
    }

    let mediaPath;
    const urlToShorten = msgRepondu.urlToshorten;

    if (msgRepondu.videoMessage) {
        mediaPath = await zk.downloadAndSaveMediaMessage(msgRepondu.urlToshorten);
    } else if (urlToShorten) {
        mediaPath = await zk.downloadAndSaveMediaMessage(urlToShorten);
    } else {
        repondre('Mention a URL to shorten.');
        return;
    }

    try {
        const response = await axios.get(`https://api.maskser.me/api/linkshort/cuttly?link=${encodeURIComponent(urlToShorten)}`);
        repondre(response.data);
    } catch (error) {
        console.error('Error while creating the short link:', error);
        repondre('Oops, an error occurred.');
    }
});

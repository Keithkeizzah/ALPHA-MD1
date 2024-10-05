const { zokou } = require("../framework/zokou");
const axios = require('axios');
const { Catbox } = require('node-catbox');
const catbox = new Catbox();

zokou({ nomCom: "catbox", categorie: "General", reaction: "👨🏿‍💻" }, async (origineMessage, zk, commandeOptions) => {
    const { msgRepondu, repondre } = commandeOptions;

    if (!msgRepondu) {
        repondre('Mention an image or video.');
        return;
    }

    let mediaPath;
    if (msgRepondu.videoMessage) {
        mediaPath = await zk.downloadAndSaveMediaMessage(msgRepondu.videoMessage);
    } else if (msgRepondu.imageMessage) {
        mediaPath = await zk.downloadAndSaveMediaMessage(msgRepondu.imageMessage);
    } else {
        repondre('Mention an image or video.');
        return;
    }

    try {
        const response = await catbox.uploadFile({ path: mediaPath });
        // Log the response URL
        console.log(response); // -> https://files.catbox.moe/XXXXX.ext
        repondre(`Uploaded successfully: ${response}`);
    } catch (err) {
        console.error(err); // -> error message from server
        repondre('An error occurred while uploading the file.');
    }
});

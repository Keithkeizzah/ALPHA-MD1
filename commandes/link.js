const { Sticker, createSticker, StickerTypes } = require('wa-sticker-formatter');
const { zokou } = require("../framework/zokou");
const uploadImageToImgur = require("../framework/imgur");
const { downloadMediaMessage } = require('@whiskeysockets/baileys');
const fs = require("fs-extra");
const axios = require('axios');
const FormData = require('form-data');

async function uploadToTelegraph(path) {
    if (!fs.existsSync(path)) {
        throw new Error("File does not exist");
    }

    try {
        const form = new FormData();
        form.append("file", fs.createReadStream(path));

        const { data } = await axios.post("https://api.imgur.com/3/image", form, {
            headers: {
                ...form.getHeaders(),
            },
        });

        if (data && data.link) {
            return data.link; // Use data.link for the URL
        } else {
            throw new Error("Error retrieving video link");
        }
    } catch (err) {
        throw new Error(String(err));
    }
}

zokou({ nomCom: "link", categorie: "General", reaction: "👨🏿‍💻" }, async (origineMessage, zk, commandeOptions) => {
    const { msgRepondu, repondre } = commandeOptions;

    if (!msgRepondu) {
        repondre('Please mention an image or video');
        return;
    }

    let mediaPath;

    try {
        if (msgRepondu.videoMessage) {
            mediaPath = await zk.downloadAndSaveMediaMessage(msgRepondu.videoMessage);
        } else if (msgRepondu.imageMessage) {
            mediaPath = await zk.downloadAndSaveMediaMessage(msgRepondu.imageMessage);
        } else {
            repondre('Please mention an image or video');
            return;
        }

        const imgUrl = await uploadImageToImgur(mediaPath); // Renamed to imgUrl
        fs.unlinkSync(mediaPath);  // Delete file after use
        repondre(imgUrl); // Respond with imgUrl
    } catch (error) {
        console.error('Error creating Imgur link:', error);
        repondre('Oops, an error occurred');
    }
});

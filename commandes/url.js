javascript
const {
    Sticker,
    createSticker,
    StickerTypes
} = require("wa-sticker-formatter");
const {
    zokou
} = require("../framework/zokou");
const traduire = require("../framework/traduction");
const {
    downloadMediaMessage,
    downloadContentFromMessage
} = require("@whiskeysockets/baileys");
const fs = require("fs-extra");
const axios = require("axios");
const {
    exec
} = require('child_process');
const ffmpeg = require("fluent-ffmpeg");
const {
    Catbox
} = require("node-catbox");
const catbox = new Catbox();

async function uploadToCatbox(filePath) {
    if (!fs.existsSync(filePath)) {
        throw new Error("Fichier non existant");
    }

    try {
        const uploadedFile = await catbox.uploadFile({
            'path': filePath
        });

        if (uploadedFile) {
            return uploadedFile;
        } else {
            throw new Error("Erreur lors de la récupération du lien du fichier");
        }
    } catch (error) {
        throw new Error(String(error));
    }
}

zokou({
    'nomCom': 'catbox',
    'categorie': "General",
    'reaction': '👨🏿‍💻'
}, async (command, api, context) => {
    const {
        msgRepondu,
        repondre
    } = context;

    if (!msgRepondu) {
        repondre("mention an image or video");
        return;
    }

    let mediaFilePath;
    if (msgRepondu.videoMessage) {
        mediaFilePath = await api.downloadAndSaveMediaMessage(msgRepondu.videoMessage);
    } else if (msgRepondu.imageMessage) {
        mediaFilePath = await api.downloadAndSaveMediaMessage(msgRepondu.imageMessage);
    } else {
        repondre("mention an image or video");
        return;
    }

    try {
        const catboxUrl = await uploadToCatbox(mediaFilePath);
        fs.unlinkSync(mediaFilePath);
        repondre(catboxUrl);
    } catch (error) {
        console.error("Error while creating your URL:", error);
        repondre("Oops error");
    }
});

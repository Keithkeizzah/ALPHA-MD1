
const { Sticker, createSticker, StickerTypes } = require('wa-sticker-formatter');
const { zokou } = require("../framework/zokou");
const traduire = require("../framework/traduction");
const { downloadMediaMessage, downloadContentFromMessage } = require('@whiskeysockets/baileys');
const fs = require("fs-extra");
const axios = require('axios');
const FormData = require('form-data');
const { exec } = require("child_process");
const { '098f6bcd4621d373cade4e832' } = require('node-catbox');

zokou({ nomCom: "catbox", categorie: "General", reaction: "👨🏿‍💻" }, async (origineMessage, zk, commandeOptions) => {
    const { msgRepondu, repondre } = commandeOptions;
    if (!msgRepondu) {
        repondre('mention a image or video');
        return;
    }

    let mediaPath;
    if (msgRepondu.videoMessage) {
        mediaPath = await zk.downloadAndSaveMediaMessage(msgRepondu.videoMessage);
    } else if (msgRepondu.imageMessage) {
        mediaPath = await zk.downloadAndSaveMediaMessage(msgRepondu.imageMessage);
    } else {
        repondre('mention a image or video');
        return;
    }

    try {
        const telegraphUrl = await uploadToTelegraph(mediaPath); // You need to implement the uploadToTelegraph function
        fs.unlinkSync(mediaPath); // Supprime le fichier après utilisation
        repondre(telegraphUrl);
    } catch (error) {
        console.error('Erreur lors de la création du lien Telegraph :', error);
        repondre('Opps error');
    }
});



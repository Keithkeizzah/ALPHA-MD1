const { Sticker, createSticker, StickerTypes } = require('wa-sticker-formatter');
const { zokou } = require("../framework/zokou");
const traduire = require("../framework/traduction");
const { downloadMediaMessage,downloadContentFromMessage } =  require('@whiskeysockets/baileys');
const fs =require("fs-extra") ;
const axios = require('axios');  
const FormData = require('form-data');
const { exec } = require("child_process");

async function uploadToimgur(Path) {
  if (!fs.existsSync(Path)) {
      throw new Error("Fichier non existant");
  }

  try {
      const form = new FormData();
      form.append("file", fs.createReadStream(Path));

      const { data } = await axios.post("https://i.imgur.com/upload", form, {
          headers: {
              ...form.getHeaders(),
          },
      });

      if (data && data[0] && data[0].src) {
          return "https://i.imgur.com" + data[0].src;
      } else {
          throw new Error("Erreur lors de la récupération du lien de la vidéo");
      }
  } catch (err) {
      throw new Error(String(err));
  }
}

zokou({ nomCom: "imgur", categorie: "General", reaction: "👨🏿‍💻" }, async (origineMessage, zk, commandeOptions) => {
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
      const imgur = await uploadToimgur(mediaPath);
      fs.unlinkSync(mediaPath);  // Supprime le fichier après utilisation

      repondre(imgur);
  } catch (error) {
      console.error('Erreur lors de la création du lien imgur :', error);
      repondre('Opps error');
  }
});

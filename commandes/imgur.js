const { zokou } = require("../framework/zokou");
const traduire = require("../framework/traduction");
const { downloadMediaMessage, downloadContentFromMessage } = require('@whiskeysockets/baileys');
const fs = require("fs-extra");
const axios = require('axios');
const { exec } = require("child_process");
const ffmpeg = require("fluent-ffmpeg");
const FormData = require('form-data');
const { Catbox } = require('node-catbox'); // Import Catbox

const catbox = new Catbox();

async function uploadToCatbox(Path) {
    if (!fs.existsSync(Path)) {
        throw new Error("Fichier non existant");
    }

    try {
        // Use Catbox to upload the file
        const response = await catbox.uploadFile({
            path: Path // Provide the path to the file
        });

        if (response) {
            return response; // returns the uploaded file URL
        } else {
            throw new Error("Erreur lors de la récupération du lien du fichier");
        }
    } catch (err) {
        throw new Error(String(err));
    }
}

zokou({ nomCom: "catbox", categorie: "General", reaction: "👨🏿‍💻" }, async (origineMessage, zk, commandeOptions) => {
  const { msgRepondu, repondre } = commandeOptions;

  if (!msgRepondu) {
      repondre('mention a image or video');
      return;
  }

  let mediaPath, mediaType;

  if (msgRepondu.videoMessage) {
      const videoSize = msgRepondu.videoMessage.fileLength;  // Get the video size in bytes

      // Check if the video size exceeds the limit (e.g., 50MB = 50 * 1024 * 1024 bytes)
      if (videoSize > 50 * 1024 * 1024) {
          repondre('The video is too long. Please send a smaller video.');
          return;
      }

      mediaPath = await zk.downloadAndSaveMediaMessage(msgRepondu.videoMessage);
      mediaType = 'video';
  } else if (msgRepondu.imageMessage) {
      mediaPath = await zk.downloadAndSaveMediaMessage(msgRepondu.imageMessage);
      mediaType = 'image';
  } else {
      repondre('reply to an image or video');
      return;
  }

  try {
      const catboxUrl = await uploadToCatbox(mediaPath);
      fs.unlinkSync(mediaPath);  // Supprime le fichier après utilisation

      // Respond with a custom message based on media type
      if (mediaType === 'image') {
          repondre(`Below is your image URL:\n${catboxUrl}`);
      } else if (mediaType === 'video') {
          repondre(`Below is your video URL:\n${catboxUrl}`);
      }
  } catch (error) {
      console.error('Error while creating your url:', error);
      repondre('Oops error');
  }
});

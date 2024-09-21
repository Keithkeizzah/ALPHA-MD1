const {
  Sticker,
  createSticker,
  StickerTypes
} = require("wa-sticker-formatter");
const { zokou } = require("../framework/zokou");
const traduire = require("../framework/traduction");
const { downloadContentFromMessage } = require("@whiskeysockets/baileys");
const fs = require("fs-extra");
const axios = require("axios");
const { exec } = require('child_process');
const ffmpeg = require("fluent-ffmpeg");
const { Catbox } = require("node-catbox");
const catbox = new Catbox();

async function uploadToCatbox(filePath) {
  if (!fs.existsSync(filePath)) {
    throw new Error("File does not exist");
  }
  try {
    const response = await catbox.uploadFile({ path: filePath });
    return response ? response : new Error("Error retrieving file link");
  } catch (error) {
    throw new Error(String(error));
  }
}

zokou({
  nomCom: 'sticker',
  aliases: ['s'],
  categorie: "Converter",
  reaction: "👨🏿‍💻"
}, async (msg, conn, { ms, mtype, arg, repondre, nomAuteurMessage }) => {
  const messageContent = JSON.stringify(ms.message);
  const isImage = mtype === "imageMessage" || (mtype === "extendedTextMessage" && messageContent.includes('imageMessage'));
  const isVideo = mtype === "videoMessage" || (mtype === "extendedTextMessage" && messageContent.includes("videoMessage"));
  const stickerPath = `${Math.floor(Math.random() * 10000)}.webp`;
  let mediaBuffer = Buffer.from([]);

  try {
    if (isImage) {
      const mediaMsg = ms.message.imageMessage || ms.message.extendedTextMessage.contextInfo.quotedMessage.imageMessage;
      const mediaStream = await downloadContentFromMessage(mediaMsg, "image");
      for await (const chunk of mediaStream) {
        mediaBuffer = Buffer.concat([mediaBuffer, chunk]);
      }
      const sticker = new Sticker(mediaBuffer, {
        pack: 'ALPHA-MD',
        author: nomAuteurMessage,
        type: arg.includes("crop") ? StickerTypes.CROPPED : StickerTypes.FULL,
        quality: 70 // Adjust quality as needed
      });
      await sticker.toFile(stickerPath);
    } else if (isVideo) {
      const mediaMsg = ms.message.videoMessage || ms.message.extendedTextMessage.contextInfo.quotedMessage.videoMessage;
      const mediaStream = await downloadContentFromMessage(mediaMsg, "video");
      const videoPath = `${Math.floor(Math.random() * 10000)}.mp4`;
      for await (const chunk of mediaStream) {
        mediaBuffer = Buffer.concat([mediaBuffer, chunk]);
      }
      await fs.promises.writeFile(videoPath, mediaBuffer);
      await new Promise((resolve, reject) => {
        ffmpeg(videoPath)
          .outputOptions([
            "-vcodec", "libwebp",
            '-vf', "fps=15,scale=512:512:force_original_aspect_ratio=decrease",
            "-loop", '0', "-preset", "default", "-an", "-vsync", '0',
            '-s', "512:512"
          ])
          .save(stickerPath)
          .on("end", async () => {
            await fs.promises.unlink(videoPath);
            resolve();
          })
          .on("error", reject);
      });
      const sticker = new Sticker(await fs.promises.readFile(stickerPath), {
        pack: "ALPHA-MD",
        author: nomAuteurMessage,
        type: arg.includes("crop") ? StickerTypes.CROPPED : StickerTypes.FULL,
        quality: 70
      });
      await sticker.toFile(stickerPath);
    } else {
      repondre("Please mention an image or video!");
      return;
    }

    await conn.sendMessage(msg, {
      sticker: await fs.promises.readFile(stickerPath)
    }, {
      quoted: ms
    });
    await fs.promises.unlink(stickerPath);
  } catch (error) {
    repondre("An error occurred while processing your sticker: " + error.message);
  }
});

// Repeat similar patterns for 'crop', 'take', 'write', 'photo', 'trt', and 'url' functions as needed


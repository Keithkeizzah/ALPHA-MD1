const { zokou } = require('../framework/zokou');
const axios = require("axios");
let { Sticker, createSticker, StickerTypes } = require('wa-sticker-formatter');
const { isUserBanned, addUserToBanList, removeUserFromBanList } = require("../bdd/banUser");
const { addGroupToBanList, isGroupBanned, removeGroupFromBanList } = require("../bdd/banGroup");
const { isGroupOnlyAdmin, addGroupToOnlyAdminList, removeGroupFromOnlyAdminList } = require("../bdd/onlyAdmin");
const { removeSudoNumber, addSudoNumber, issudo } = require("../bdd/sudo");
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

zokou({ nomCom: "send", categorie: "Mods" }, async (dest, zk, commandeOptions) => {
  const { repondre, msgRepondu, superUser, auteurMessage } = commandeOptions;

  if (superUser) {
    if (msgRepondu) {
      console.log(msgRepondu);
      let msg;

      if (msgRepondu.imageMessage) {
        let media = await zk.downloadAndSaveMediaMessage(msgRepondu.imageMessage);
        msg = {
          image: { url: media },
          caption: msgRepondu.imageMessage.caption,
          forwardingScore: 9999,
          isForwarded: true,
        };
      } else if (msgRepondu.videoMessage) {
        let media = await zk.downloadAndSaveMediaMessage(msgRepondu.videoMessage);
        msg = {
          video: { url: media },
          caption: msgRepondu.videoMessage.caption,
          forwardingScore: 9999,
          isForwarded: true,
        };
      } else if (msgRepondu.audioMessage) {
        let media = await zk.downloadAndSaveMediaMessage(msgRepondu.audioMessage);
        msg = {
          audio: { url: media },
          mimetype: 'audio/mp4',
          forwardingScore: 9999,
          isForwarded: true,
        };
      } else if (msgRepondu.stickerMessage) {
        let media = await zk.downloadAndSaveMediaMessage(msgRepondu.stickerMessage);
        let stickerMess = new Sticker(media, {
          pack: 'ALPHA-MD',
          type: StickerTypes.CROPPED,
          categories: ["🤩", "🎉"],
          id: "12345",
          quality: 70,
          background: "transparent",
        });
        const stickerBuffer2 = await stickerMess.toBuffer();
        msg = { sticker: stickerBuffer2 };
      } else {
        msg = {
          text: msgRepondu.conversation,
        };
      }

      await zk.sendMessage(auteurMessage, msg);
    } else {
      repondre('Mention the message that you want to save');
    }
  } else {
    repondre('Only mods can use this command');
  }
});

